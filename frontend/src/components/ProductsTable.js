import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

const ProductTable = () => {
  const [data, setData] = useState([])
  const columns = [
    {
      title: 'ID',
      field: 'id',
      width: '1%',
      headerStyle: {
        backgroundColor: '#da281c'
      }
    },
    { title: 'Nama Produk', field: 'nama' },
    { title: 'Harga', field: 'harga' },
    { title: 'Jumlah', field: 'jumlah' }
  ]

  useEffect(() => {
    const url = 'http://localhost:8000/items'

    fetch(url)
      .then((data) => data.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <MaterialTable
      title="Data Produk Lottemart"
      data={data}
      columns={columns}
      options={{
        headerStyle: {
          backgroundColor: '#da281c',
          color: '#FFF'
        }
      }}
    />
  )
}

export default ProductTable
