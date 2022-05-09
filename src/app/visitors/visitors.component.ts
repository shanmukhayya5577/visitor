import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { jsPDF } from "jspdf";
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatPaginator } from '@angular/material/paginator';
// import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  paginator:any


  @ViewChild("content", { static: false }) el!: ElementRef;

  // @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;


  mainCheck: boolean = false;
  visitor: any
  p: number = 1   //this is for pegination
  visitor1:any    //this is for search
  listData: any = [] //this is for excel
  pdfDataArr:any=[]


  visit = [
    { select: false, visitor: 'virat', host: 'xyz', location: 'bangalore', visit: "5pm", custome: "", },
    { select: false, visitor: 'dhoni', host: 'abc', location: 'chennai', visit: "3pm", custome: "", },
    { select: false, visitor: 'ABD', host: 'def', location: 'bangalore', visit: "10am", custome: "", },
    { select: false, visitor: 'Raina', host: 'ghi', location: 'kolkatta', visit: "11am", custome: "", },
    { select: false, visitor: 'Maxwell', host: 'jkl', location: 'Panjab', visit: "9:30am", custome: "", },
    { select: false, visitor: 'Padikal', host: 'pqr', location: 'Karnataka', visit: "4:30pm", custome: "", },
    { select: false, visitor: 'Chahal', host: 'stq', location: 'Goa', visit: "2pm", custome: "", },
    { select: false, visitor: 'Ambati', host: 'rst', location: 'Manipur', visit: "11am", custome: "", },
    { select: false, visitor: 'Sachin', host: 'uvw', location: 'Madras', visit: "5pm", custome: "", },
    // {select:false,visitor:'Smith',host:'wsa',location:'Mangalore',visit:"",custome:"",},
    // {select:false,visitor:'Archar',host:'knf',location:'Delhi',visit:"",custome:"",},
    // {select:false,visitor:'Sundar',host:'urs',location:'Kerala',visit:"",custome:"",},
    // {select:false,visitor:'Harshad',host:'htt',location:'Andra',visit:"",custome:"",},

  ]


  shanmuk = new FormGroup({
    visitor: new FormControl('',),
    visit: new FormControl('',),
    location: new FormControl(''),
    host: new FormControl('')
  })
  dataSource: any;

  //  get visitor() {
  //   return this.shanmuk.get('visitor')
  // }

  // get visit() {
  //   return this.shanmuk.get('visit')
  // }

  get location() {
    return this.shanmuk.get('location')
  }

  get host() {
    return this.shanmuk.get('host')
  }

  //adding the data into table
  addData() {
    console.log(this.shanmuk.value)
    this.visit.push(this.shanmuk.value)
    alert("data added succesfully")
    this.shanmuk.reset()
  
  }

  //this is for checkbox
  onchangedata($event: any) {
    let visitor = $event.target.value
    let ischecked = $event.target.checked
    // console.log(visitor,ischecked)

    this.visit = this.visit.map(d => {
      if (d.visitor == visitor) {
        d.select = ischecked
        return d
      }
      if (visitor == -1) {
        d.select = this.mainCheck
        return d;
      }
      return d
    });
    console.log(this.visit)

  }


  constructor() { }

  //this is for searching purpose
  ngOnInit(): void {
    // this.dataSource.paginator=this.paginator
  }
  search() {
// if(this.visit.length === -1){
//    this.visit;
// }
    if (this.visitor!== "") {
      this.visit = this.visit.filter(res => {
        return res.visitor.toLocaleLowerCase().match(this.visitor.toLocaleLowerCase());
      });
    } else if (this.visitor === "") {

    // //  this.shanmuk.value
    //   // this.ngOnInit();
    //   // return this.ngOnInit()
      this.visit
    }
    // if(this.visitor==""){
    //   this.ngOnInit();
    // }else{
    //   this.visit=this.visit.filter(res=>{
    //     return res.visitor.toLocaleLowerCase().match(this.visitor.toLocaleLowerCase());
    //   })
    // }
  }

  //this is for sort purpose
  key: string = "visitor";
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //this is  for Excel
  excel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      // noDownload: true,
      headers: ["select","visitor", "host", "location", "visit", "custome"]
    };

    this.listData=this.visit.filter(result=>{
        return result.select === true
    })
   console.log(this.listData);

  //  if(this.listData){
  //  (this.listData ? 'true' : 'false');
  //  }
  
  //  if(this.listData === -1){
  //    wantDisable= true
  //  }else{
  //   wantDisable= false
  //  }
   
    // if(this.listData.length === 0){
    //   this.listData=this.visit
    // }

    new ngxCsv(this.listData, "Report", options);
  }

  //this is for pdf
  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("listData.pdf")
        // if(this.listData.length=== -1){
        //   return this.pdfDataArr
        // }else if(this.listData.length>=0)
        // pdf.save("listData.pdf")
        // console.log(this.listData)
      }
    })
  
  // makePdf(){
  //   let pdf = new jsPDF('p',"pt","a2")
  //   this.pdfDataArr=this.visit.filter(result=>{
  //     if(result.select === true){
  //       this.pdfDataArr=pdf
      
  //     return console.log(this.pdfDataArr) 
  //   }
  // })
  // console.log(pdf.save("pdfDataArr.pdf"))

//   enable(check1:any){
// let ddl=document.getElementById('dropdownMenuButton');
// ddl?.disabled=check1.checked ? false : true
// if(!ddl.disabled){
//   ddl?.focus()
// }
//   }

//     let pdf = new jsPDF('p',"pt","a2")
// this.listData.xlsx.writeBuffer().then((data: BlobPart) => {
//   const blob = new Blob([data], { type: 'application/pdf' });
//   // or with 'application/octet-stream' type
//   // const blob = new Blob([data], { type: 'application/octet-stream' });
//   pdf.save('listData.pdf');
// });
// console.log(Blob);


  }
  
}
