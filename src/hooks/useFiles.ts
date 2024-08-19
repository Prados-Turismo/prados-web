import { useState } from "react";
import { apiPrados } from "../services/api";


const generateCsvPessoas = () => {
  const [isLoading, setIsLoading] = useState(false);

  const csv = async () => {
    setIsLoading(true);
    await apiPrados.get('/files/csv-pessoas', {
      responseType: 'blob'
    }).then(function (response) {

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pessoas.csv';
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return {
    isLoading,
    csv
  };
}


export default function useFiles() {
  return {
    generateCsvPessoas
  }
}