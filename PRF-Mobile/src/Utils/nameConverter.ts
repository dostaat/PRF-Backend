import { Injectable } from '@angular/core';

@Injectable()
export class NameConvert {
    toLower(inputCity) {
        return inputCity.toLowerCase();
    }

    toFirstUpper(inputCity) {    
        return toTitleCase(inputCity);
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }
}