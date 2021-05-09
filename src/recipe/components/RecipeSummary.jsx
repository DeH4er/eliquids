import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

function RecipeSummary({ summary }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>ml</Th>
          <Th isNumeric>%</Th>
        </Tr>
      </Thead>
      <Tbody>
        {summary.map((summaryItem) => (
          <Tr key={summaryItem.name}>
            <Td>{summaryItem.name}</Td>
            <Td isNumeric>{summaryItem.amount.toFixed(2)}</Td>
            <Td isNumeric>{summaryItem.percent.toFixed(2)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RecipeSummary;
