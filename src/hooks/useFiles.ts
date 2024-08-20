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

const generateCsvQuartos = () => {
  const [isLoading, setIsLoading] = useState(false);

  const csv = async (idExcursao: string) => {
    setIsLoading(true);
    await apiPrados.get(`/files/csv-quartos/${idExcursao}`, {
      responseType: 'blob'
    }).then(function (response) {

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quartos.csv';
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

const generateCsvPassageiros = () => {
  const [isLoading, setIsLoading] = useState(false);

  const csv = async (idExcursao: string) => {
    setIsLoading(true);
    await apiPrados.get(`/files/csv-passageiros/${idExcursao}`, {
      responseType: 'blob'
    }).then(function (response) {

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'passageiros.csv';
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
    generateCsvPessoas,
    generateCsvQuartos,
    generateCsvPassageiros
  }
}