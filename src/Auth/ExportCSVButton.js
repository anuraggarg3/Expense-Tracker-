import React, { useContext, useState ,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { ExpenseTrackerContext } from '../context/context';
const ExportCSVButton = () => {
    const { arrytransactions } = useContext(ExpenseTrackerContext);
  const [csvData, setCsvData] = useState('');
console.log("arrytransactions",arrytransactions);
const convertToCSV = () => {
    const header = 'ID,Type,Category,Date,Amount'; // Ensure correct fields
    const csvRows = [header]; 
console.log("arrytransactions",arrytransactions)
    arrytransactions.forEach(transaction => {
      const row = [
          transaction.id,
          transaction.type,
          transaction.category,
          transaction.date,
        transaction.amount,
      ].join(',');
      csvRows.push(row);
    });

    const csvString = csvRows.join('\n');
    return csvString; // Return the generated CSV data
  };

  const handleExportCSV = () => {
    const csvData = convertToCSV(); 
    console.log("csvdata",csvData);
    const csvFile = new Blob([csvData], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = 'transactions.csv';
    downloadLink.click();
  };

  return (
    <Button variant="outlined" color="primary" style={{ marginRight: '30px' ,marginTop:'5px'}} onClick={handleExportCSV}>
      Export to CSV
    </Button>
  );
};

export default ExportCSVButton;
