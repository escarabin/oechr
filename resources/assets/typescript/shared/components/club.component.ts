import { Component } from '@angular/core';
import { Response } from '@angular/http';
// import { RouteParams } from '@angular/router-deprecated';

// Services
import { ClubService } from './../../services/club.service';

@Component({
    inputs: ['clubId'],
    selector: 'club',
    templateUrl: '../templates/club.component.html',
})

export class ClubComponent {
    clubId:string;
    club: any;

    constructor(private clubService: ClubService) {
        let __this = this;
        /*this.clubId = routeParams.get("clubId");

        clubService.getClub(__this.clubId).subscribe((res: Response) => {
            __this.club = res.json();
        });*/
    }
}