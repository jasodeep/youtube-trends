import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as CONFIG from '../../config';

@Injectable()
export class YoutubeService {

    private params: any;
    private options: any;

    constructor(private http: Http, private _jsonp: Jsonp) { }

	getTrendingVideos(country: string) {
		this.params = new URLSearchParams();
        this.params.set('part', 'snippet');
        this.params.set('chart', 'mostPopular');
        this.params.set('regionCode', country);
        this.params.set('maxResults', '24');
        this.params.set('key', CONFIG.youtubeApiKey);
        this.options = new RequestOptions({
        	search: this.params
    	});
	    return this.http.get(CONFIG.youtubeEndPoint, this.options)
	    	.map(res => res.json())
	        .catch(this.throwError);
    }

    getVideoDetails(videoId: string) {
        this.params = new URLSearchParams();
        this.params.set('part', 'statistics');
        this.params.set('id', videoId);
        this.params.set('key', CONFIG.youtubeApiKey);
        this.options = new RequestOptions({
            search: this.params
        });
        return this.http.get(CONFIG.youtubeEndPoint, this.options)
            .map(res => res.json())
            .catch(this.throwError);
    }

    getTW() {
      var header = new Headers();
      header.append("Authorization", "OAuth oauth_consumer_key='0bkCb5SHZS45Hw34j0COlGJMJ',oauth_token='267615872-IEvDvezamGs2WJUdYZulRVfcNN4vxfkPkBuaoOXc',oauth_signature_method='HMAC-SHA256',oauth_timestamp='1487667635',oauth_nonce='5vG5kL',oauth_version='1.0',oauth_signature='BjtNV8HAbchOV4EhlfGa5wwg2wQnxnc3Tx6xSxa6k5o%3D'");
      return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi', {headers: header})
            .map(res => res.json())
            .catch(this.throwError);
    }

    private throwError(error: any) {
        return Observable.throw(error.status);
    }
}
