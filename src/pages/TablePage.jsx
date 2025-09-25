import './TablePage.css';

const TablePage = ({ data, sortConfig, setSortConfig }) => {
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }

    return (
        <div>
            <h1>Table View</h1>
            <table className="data-table" border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.coordinates.lat}</td>
                                    <td>{item.address.coordinates.lng}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TablePage;