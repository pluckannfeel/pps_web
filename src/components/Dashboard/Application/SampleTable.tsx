import { Table } from '@mantine/core';
import React from 'react';

const elements = [
    { name: 'John Doe', company: 'Company ABC', document_type: 'Direct Employer', representative: 'John Smith' },
    { name: 'Anne Frank', company: 'Company XYZ', document_type: 'Dispatch Company', representative: 'Satoshi Hashimoto' },
  ];

const SampleTable:React.FunctionComponent = () => {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.company}</td>
      <td>{element.document_type}</td>
      <td>{element.representative}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Document Type</th>
          <th>Representative</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default SampleTable;