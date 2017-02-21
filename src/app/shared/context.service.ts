import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ContextService {
	public country: string;
	countryChanged: EventEmitter<string> = new EventEmitter<string>();

  	constructor() {
    }

    setCountry(country) {
    	this.country = country;
    	this.countryChanged.emit(this.country);
  	}

  	getCountry() {
    	return this.country;
  	}
}
