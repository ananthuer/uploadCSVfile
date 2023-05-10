import { Injectable } from '@nestjs/common';
import { CreateMiscelleanousDto } from './dto/create-miscelleanous.dto';
import { UpdateMiscelleanousDto } from './dto/update-miscelleanous.dto';
const Chart = require('chart.js');
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const readXlsxFile = require('read-excel-file/node');


const XLSX = require('xlsx');

@Injectable()
export class MiscelleanousService {
 async create(filename: string) {
  const ext = filename.split('.');
  
  if (ext[1] === 'csv') {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

    const csvData = [];

    const stream = fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
      .on('data', (data) => {
        csvData.push(data);
      })
      .on('error', (err) => {
        console.error(err);
      })
      .on('end', async () => {
       
        // Process the data as required
        // Eliminate all blank rows
        const filteredData = csvData.filter(row => Object.values(row).some(cell => typeof cell === 'string' && cell.trim().length > 0));
        
        // Skip the first row, which represents the header row
        const headerRow = Object.keys(filteredData[0]).map(header => header.toUpperCase());
        const serialData = [headerRow, ...filteredData.map((row, index) => [index + 1, ...Object.values(row)])];

        // Add the "SL.NO" header at index 0 of the first row
        serialData[0].unshift('SL.NO');

        // Export the result as a .xlsx file
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(serialData);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const exportPath = path.join(__dirname, '..', '..', 'exports', 'output.xlsx');
        XLSX.writeFile(wb, exportPath);

        // Generate a Pie chart to represent Gender ratio as (.png)
        const genderData: any[] = filteredData.reduce((acc, row) => {
          const gender = row['Gender'];
          if (gender === 'Male') {
            acc['Male'] = acc['Male'] ? acc['Male'] + 1 : 1;
          } else if (gender === 'Female') {
            acc['Female'] = acc['Female'] ? acc['Female'] + 1 : 1;
          } else {
            acc['Other'] = acc['Other'] ? acc['Other'] + 1 : 1;
          }
          return acc;
        }, {});
        

        const canvas = createCanvas(400, 400);
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;

        let currentAngle = 0;
        const colors = ['#e81c4f', '#4fc3e8','#cccccc'];
        const total = Object.values(genderData).reduce((acc, count) => acc + count, 0);

        for (const gender of Object.keys(genderData)) {
          const count = genderData[gender];
          const percent = (count / total) * 100;
          const endAngle = currentAngle + (Math.PI * 2 * (count / total));
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, currentAngle, endAngle);
          ctx.fillStyle = colors.shift();
          ctx.fill();
          currentAngle = endAngle;
        }

        ctx.font = '20px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(`Female: RED`, 20, 360);
        ctx.fillText(`Male: SKY BLUE`, 20, 380);
        ctx.fillText(`Other: SILVER`, 20, 400);

        const imagePath = path.join(__dirname, '..', '..', 'exports', 'gender_ratio.png');
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(imagePath, buffer);

       
      });

      return {
        xlsx: 'http://localhost:8000/exports/output.xlsx',
        png: 'http://localhost:8000/exports/gender_ratio.png',
      };
  }


  }

  findAll() {
    return `This action returns all miscelleanous`;
  }

  findOne(id: number) {
    return `This action returns a #${id} miscelleanous`;
  }

  update(id: number, updateMiscelleanousDto: UpdateMiscelleanousDto) {
    return `This action updates a #${id} miscelleanous`;
  }

  remove(id: number) {
    return `This action removes a #${id} miscelleanous`;
  }

  async readFile(filename:any) {
    const ext = filename.split('.');
  
    if (ext[1] === 'csv') {
      const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
  
      const csvData = [];
  
      const stream = fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('error', (err) => {
          console.error(err);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          // Process the data as required
          // Eliminate all blank rows
          const filteredData = csvData.filter(row => Object.values(row).some(cell => typeof cell === 'string' && cell.trim().length > 0));
          
          // Skip the first row, which represents the header row
          const serialData = [Object.keys(filteredData[0]), ...filteredData.slice(1)].map((row, index) => [index + 1, ...Object.values(row)]);
  
          // Export the result as a .xlsx file
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.aoa_to_sheet(serialData);
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          const exportPath = path.join(__dirname, '..', '..', 'exports', 'output.xlsx');
          XLSX.writeFile(wb, exportPath);
  
          console.log('XLSX file exported successfully');
  
          return `http://localhost:5000/exports//output.xlsx`;
  
          // Generate a Pie chart to represent Gender ratio as (.png)
          // TODO: Implement code to generate the chart
        });
    }
  }
  

  async  generatePieChart(genderData) {
    const canvas = createCanvas(600, 400);
    const ctx = canvas.getContext('2d');
  
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(genderData),
        datasets: [{
          data: Object.values(genderData),
          backgroundColor: [
            'red',
            'blue',
            'green'
          ]
        }]
      },
      options: {
        responsive: false
      }
    });
  
    const buffer = canvas.toBuffer('image/png');
  
    const exportPath = path.join(__dirname, '..', '..', 'exports', 'gender.png');
    fs.writeFileSync(exportPath, buffer);

  
  }
  
  

}

