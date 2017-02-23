import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { YoutubeService } from './youtube.service';
import { ContextService } from '../../shared/context.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment';

@Component({
  selector: 'youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
})

export class YoutubeComponent implements OnInit {

  private loader: any;
  private videoLoader: any;
  private country: any;
	private trendingVideos: any[] = [];
  private embedUrl: any;
  private videoId: any;
  @ViewChild('modal')
  private modal: ModalComponent;

	constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer, public appContext: ContextService) {

  }
  public loadVideo() : void {
    console.log('AAA');
    this.videoLoader = false;
  }
  ngOnInit() {
    this.modal.backdrop = false;
    this.loadVideos('');
    this.appContext.countryChanged.subscribe(
      (lang) => {
        this.country = this.appContext.getCountry();
        this.loadVideos(this.country);
      }
    );
  }
  public loadVideos(countryCode: string) : void {
    this.loader = true;
    this.youtubeService.getTrendingVideos(this.country).subscribe((result)=>{
      for (var i = 0; i < result.items.length; i++) {
        this.trendingVideos[i] = {
          id: result.items[i].id,
          title: result.items[i].snippet.title,
          thumbnail: result.items[i].snippet.thumbnails.high.url,
          publishedAt: moment(result.items[i].snippet.publishedAt).fromNow()
        };
        this.getVideoStats(i, result.items[i].id);
      }
      this.loader = false;
    });
  }

  public getVideoStats(videoIndex: number, videoId: any) : void {
    this.youtubeService.getVideoDetails(videoId).subscribe((result)=>{
      this.trendingVideos[videoIndex].viewCount = result.items[0].statistics.viewCount;
      this.trendingVideos[videoIndex].likeCount = result.items[0].statistics.likeCount;
    });
  }

  public openVideoPlayer(videoId: any) : void {
    this.videoLoader = true;
    this.videoId = videoId;
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?autoplay=1');
    this.modal.open();
  }

  public modalDismiss() {
      this.embedUrl = null;
  }

  public modalClose() {
    console.log('VIDEO PLAYER CLOSED !!');
    this.modal.close();
    this.embedUrl = null;
  }
}
