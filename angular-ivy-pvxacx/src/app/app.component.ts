import { Component, VERSION } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//Client Details
export class Client {
  FullName: string;
  StartDate: any;
  EndDate: any;
  ServiceCost: number;
  ServiceDescription: string;
}

//skill export
export class Skill {
    value: string;//NO
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  name = 'Lesedi';

  //Client Class
  client = new Client();

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //
    this.client = JSON.parse(sessionStorage.getItem('client')) || new Client();

   }

   generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

   resetForm() {
    this.client = new Client();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('client', JSON.stringify(this.client));
    return {

      header: [
        {
          table: {
            widths: [ 700, ''],
            body: [
              ["RECRUITMENT RATES AND TERMS AGREEMENT",""]
            ]
          }
        }
      ],

      footer: function(currentPage, pageCount) { return 'Page ' + currentPage.toString() + ' of ' + pageCount; },
      

      content: [
        
        //COVER PAGE
        {
          text: 'FIXED TERM AGREEMENT',
          bold: true,
          fontSize: 20,
          alignment: 'left',
          margin: [0, 200, 0, 20]
        },
        {
          text: 'between',
          fontSize: 12,
          margin: [0, 0, 0, 20]
        },
        {
          text: 'BMF ATTORNEYS',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'with company registration number 2022/123456/07',
          bold: true,
          fontSize: 18,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'and',
          fontSize: 12,
          alignment: 'left',
          margin: [0, 0, 0, 20]
        },
        {
          text: this.client.FullName,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: "Collectively referred herein as the “parties”",
          fontSize: 14,
          alignment: 'left',
          margin: [0, 0, 0, 20],
          pageBreak: "after"
        },

        //NEXT PAGE
        {
          text : ["1. Payment Terms:"],
          bold: true,
          fontSize: 17
        },
        {
          text : ["BMF Attorney’s fee R", this.client.ServiceCost, " (excluding VAT). The retainer fee can be paid upfront, or month-to-month and the payment terms can be payable as follows:"],
          fontSize: 12
        }, 
        {
          ul : ["Upfront:"],
          fontSize: 12,
          margin: [20, 0, 20, 0]
        },
        {
          ul : ["Three-twelfths of the fee during the probation period in 3 equal instalments by the 7th day of each month", "Nine-twelfths of the fee upon conclusion of the probation period of employment payable on the 7th day of the 4th month."],
          fontSize: 12,
          margin: [40, 0, 40, 0]
        },
        {
          ul : ["Month-to-month:"],
          fontSize: 12,
          margin: [20, 0, 20, 0]
        },
        {
          ul : ["The month-to-month fee shall be paid by the 7th day of each month"],
          fontSize: 12,
          margin: [40, 0, 40, 0]
        },
        {
          ul : ["No variation or amendment to this Agreement shall be of any effect unless such amendment is put in writing and signed by all parties", "Any documentation prepared by BMF Attorneys remains its property"],
          fontSize: 12,
          margin: [20, 0, 20, 20]
        },
        {
          text : ["2. Appointment:"],
          bold: true,
          fontSize: 17
        },
        {
          ol : ["The Client has procured the services of BMF Attorneys and hereby accepts the appointment as an independent contractor of the Client for a fixed period of time.", "The reason for this fixed-term contract is for the appointment and completion of the "+ this.client.ServiceDescription],
          fontSize: 12,
          margin: [10, 0, 10, 20]
        },
        {
          text : ["3. Duration:"],
          bold: true,
          fontSize: 17,
        },
        {
          ol : ["Notwithstanding the date of signature hereof, this fixed term contract shall be deemed to have commenced on the "+ this.client.StartDate+ " and will terminate, without further notice, on the "+ this.client.EndDate+ ". ", "The automatic termination of the contract on the Termination Date shall not be construed as a dismissal but as the completion of a fixed term contract."],
          fontSize: 12,
          margin: [10, 0, 10, 20],
          pageBreak: "after"
        },

        //NEXT PAGE
        {
          text : ["4. "],
          bold: true,
          fontSize: 17
        },
        {
          text : ["Signed at _________________ on ______________ ."],
          fontSize: 14,
          margin: [10, 0, 10, 30]
        },
        {
          text : ["_________________ ."],
          fontSize: 14,
          margin: [10, 0, 10, 10]
        },
        {
          text : ["Who warrants authority on behalf of Jobox"],
          fontSize: 14,
          margin: [10, 0, 10, 15]
        },
        {
          text : ["Signed at _________________ on ______________ ."],
          fontSize: 14,
          margin: [10, 0, 10, 30]
        },
        {
          text : ["_________________ ."],
          fontSize: 14,
          margin: [10, 0, 10, 10]
        },
        {
          text : ["Who warrants authority on behalf of Jobox"],
          fontSize: 14,
          pageBreak: "after"
        },
      ],

      info: {
        title: this.client.FullName + ' (Contract)',
        author: "Lesedi",
        subject: 'Contact',
        keywords: 'CONTRACT, BUILDER',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          
        }
    };
  }

}
