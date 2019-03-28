import { Print } from './../classes/prints';
import { PrintsService } from './../services/prints.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // TODO: Get users from database;
  // usrid, amount, date, date_until, filename, name, time, length, weight, price
  public inputList = [
    ["Amount", "amount", "number"],
    ["Date", "date", "Date"],
    ["Date Until", "date_until", "Date"],
    ["Name", "name", "string"],
    ["Time", "time", "number"],
    ["Length", "length", "number"],
    ["Weight", "weight", "number"],
    ["Price", "price", "number"]
  ];

  constructor(
    private printsService: PrintsService
  ) { }

  ngOnInit() {
    // TODO: If filename is right format: Auto fill out other fields
  }


  public checkFilename(filename){
    if((filename.split("_").length - 1) == 4){
      let obj = filename.split("_");
      
      (<HTMLInputElement>document.getElementById("name")).value = obj[0].replace(/-/g, " ");
      (<HTMLInputElement>document.getElementById("time")).value = this.formatTime(obj[1]);
      (<HTMLInputElement>document.getElementById("length")).value = obj[2].replace(",", ".");
      (<HTMLInputElement>document.getElementById("weight")).value = obj[3].replace(",", ".");
      (<HTMLInputElement>document.getElementById("price")).value = obj[4].replace(",", ".");
    }
  }

  public submit(){
    // Filename:     usrid-amount-date-date_until-filename-name-time-length-weight-price
    var amount = (<HTMLInputElement>document.getElementById("amount")).value;
    var date = (<HTMLInputElement>document.getElementById("date")).value;
    var date_until = (<HTMLInputElement>document.getElementById("date_until")).value;
    var filename = (<HTMLInputElement>document.getElementById("filename")).value;
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var time = (<HTMLInputElement>document.getElementById("time")).value;
    var length = (<HTMLInputElement>document.getElementById("length")).value;
    var weight = (<HTMLInputElement>document.getElementById("weight")).value;
    var price = (<HTMLInputElement>document.getElementById("price")).value;

    // TODO: Get user-id from cookie
    let usrid: number = 0;

    // "+" is to cast string to number
    // new Date to cast string to Date
    let print: Print = new Print(usrid, +amount, new Date(date), new Date(date_until), filename, name, +time, +length, +weight, +price);
    console.log(print);
    // this.printsService.postPrint(print);

    this.clearInput();
  }
  // TODO: Clear input fields after successful submit

  private formatTime(str){
      // Split XXhYYmin into X.YY
      var time = str.split("h");
      time[1] = (time[1].split("min"))[0];
      // "+" to cast from string to int
      time =  +time[0] + (((time[1] / 100) / 60) * 100);

    return time;
  }
  private clearInput(){
    (<HTMLFormElement>document.getElementById('printForm')).reset();
  }
}
