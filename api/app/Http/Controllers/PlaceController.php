<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use App\Models\Business;
use App\Models\PlaceType;
use DB;
use App\Models\Place;
use Illuminate\Support\Facades\Log;

class PlaceController extends Controller
{
    /**
     * Save a new place or business
     * @param Request $request
     * @return Place / Business
     */
   public function save(Request $request) {
       $placeData = $request::input('place');

       $place = $this->savePlaceData($placeData);

       if (in_array('establishment', $placeData['types'])) {
           $place = Place::where('googlePlaceId', $placeData['place_id'])->first();

           /**
            * Find business related to this place
            */
           $business = Business::where('place_id', $place->id)->first();

           /**
            * If business does not exist, create it
            */
           if (!$business) {
               $business = $this->createBusinessFromPlaceData($place, $placeData);
           }

           return $business;
       }
       else {
           return $place;
       }
   }

    /**
     * Save a new place
     * @param $placeData
     * @return Place
     */
   public function savePlaceData($placeData) {
       // Check if place already exists in db
       $place = Place::where('googlePlaceId', $placeData['place_id'])->first();

       if (!$place) {
           // Parse place types into array (initially separated by commas)
           $types = $placeData['types'];

           $place = new Place();

           $adr_adress = $placeData['adr_address'];

           $place->googlePlaceId = $placeData['place_id'];

           $place->adress = $placeData['formatted_address'];
           $place->city = $this->getStringBetween($adr_adress, '<span class="locality">', '</span>');
           $place->postalCode = $this->getStringBetween($adr_adress, '<span class="postal-code">', '</span>');
           $place->lat = $placeData['geometry']['location']['lat'];
           $place->lon = $placeData['geometry']['location']['lng'];

           if (array_key_exists('viewport', $placeData['geometry'])) {
               $place->viewport_south = $placeData['geometry']['viewport']['south'];
               $place->viewport_west = $placeData['geometry']['viewport']['west'];
               $place->viewport_north = $placeData['geometry']['viewport']['north'];
               $place->viewport_east = $placeData['geometry']['viewport']['east'];
           }

           $place->save();

           foreach($types as $type) {
               if ($type != "") {
                   $placeType = PlaceType::where('title', $type)->first();
                   if ($placeType) {
                       $place->types()->attach($placeType->id);
                   }
               }
           }
       }

       return $place;
   }

    /**
     * Create business from place data
     * @param $place
     * @param $additionnalInfos
     * @return Business
     */
    public function createBusinessFromPlaceData($place, $additionnalInfos) {
        $business = new Business();

        $business->place_id = $place->id;
        $business->title = $additionnalInfos['name'];
        if (array_key_exists('formatted_phone_number', $additionnalInfos)) {
            $business->phone = $additionnalInfos['formatted_phone_number'];
        }
        if (array_key_exists('website', $additionnalInfos)) {
            $business->website = $additionnalInfos['website'];
        }

        $business->save();

        return $business;
    }

    /**
     * Function used to retrieve the text between two specific characters
     * @param $str
     * @param $from
     * @param $to
     * @return string
     */
   private function getStringBetween($str,$from,$to)
   {
       $sub = substr($str, strpos($str,$from)+strlen($from),strlen($str));
       return substr($sub,0,strpos($sub,$to));
   }
}