import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Opcional {
  id: string;
  nome: string;
  valor: number;
}

interface ProdutoOpcionalProps {
  produtoData: Opcional[];
  onTotalChange: (total: number) => void;
  onQuantitiesChange: (quantities: { id: string; quantidade: number; valor: number, nome: string }[]) => void;
}

const ProdutoOpcional: React.FC<ProdutoOpcionalProps> = ({ produtoData, onTotalChange, onQuantitiesChange }) => {
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>(
    produtoData.reduce((acc, opcional) => {
      acc[opcional.id] = 1;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleIncrement = (id: string) => {
    setQuantidades((prevQuantidades) => {
      const newQuantities = {
        ...prevQuantidades,
        [id]: prevQuantidades[id] + 1,
      };
      return newQuantities;
    });
  };

  const handleDecrement = (id: string) => {
    setQuantidades((prevQuantidades) => {
      const newQuantities = {
        ...prevQuantidades,
        [id]: Math.max(0, prevQuantidades[id] - 1),
      };
      return newQuantities;
    });
  };

  const calculateTotal = () => {
    return produtoData.reduce((total, opcional) => {
      return total + quantidades[opcional.id] * opcional.valor;
    }, 0);
  };

  useEffect(() => {
    const total = calculateTotal();
    onTotalChange(total);

    const formObject = produtoData.map(opcional => ({
      id: opcional.id,
      quantidade: quantidades[opcional.id] || 0,
      valor: opcional.valor,
      nome: opcional.nome
    }));
    onQuantitiesChange(formObject);

  }, [quantidades, produtoData]);

  return (
    <>
      <h1><b>Opcionais</b></h1>
      {produtoData.map((opcional) => (
        <Box p={4} borderWidth="1px" borderRadius="md" key={opcional.id}>
          <HStack spacing={1} align="center">
            <Text fontWeight="bold">{opcional.nome}</Text>
            <Text>R$ {opcional.valor}</Text>
            <Button onClick={() => handleDecrement(opcional.id)}>-</Button>
            <input
              type="number"
              value={quantidades[opcional.id] || 0}
              readOnly
            />
            <Button onClick={() => handleIncrement(opcional.id)}>+</Button>
            <Text>Total: R$ {quantidades[opcional.id] * opcional.valor}</Text>
            {/* Registrando os valores no formulário */}
            <input
              type="hidden"
              name={`opcionais.${opcional.id}.quantidade`}
              value={quantidades[opcional.id]}
            />
            <input
              type="hidden"
              name={`opcionais.${opcional.id}.id`}
              value={opcional.id}
            />
          </HStack>
        </Box>
      ))}
    </>
  );
};

export default ProdutoOpcional;