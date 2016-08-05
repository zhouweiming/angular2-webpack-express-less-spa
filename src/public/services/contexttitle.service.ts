import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class ContextLayoutService {
  // Observable string sources
  private missionAnnouncedSource = new Subject<any>();
  private missionConfirmedSource = new Subject<{ title: string }>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // Service message commands
  announceMission(mission) {
    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: { title: string } = { title: "need a title" }) {
    this.missionConfirmedSource.next(astronaut);
  }
}