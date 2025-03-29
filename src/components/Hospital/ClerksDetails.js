import React from 'react'

const ClerksDetails = ({clerks, setClerks}) => { // Add setClerks prop
    const [nameFilter, setNameFilter] = React.useState('');
    const [roleFilter, setRoleFilter] = React.useState('');

    const filteredClerks = clerks?.filter(clerk => {
        return clerk.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (roleFilter === '' || clerk.role === roleFilter);
    });

    const uniqueRoles = [...new Set(clerks?.map(clerk => clerk.role) || [])];

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/deleteClerk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id })
            });

            if (response.ok) {
                // Remove the deleted clerk from the state
                setClerks(clerks.filter(clerk => clerk._id !== id));
            } else {
                console.error('Failed to delete clerk');
            }
        } catch (error) {
            console.error('Error deleting clerk:', error);
        }
    };

    return (
        <div>
            <div className="flex gap-4 p-5">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="p-2 border rounded-md"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Roles</option>
                    {uniqueRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {filteredClerks?.map((clerk) => (
                    <div 
                        key={clerk._id} 
                        className="bg-white rounded-lg shadow-md p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <h3 className="text-2xl text-gray-800 mb-4">{clerk.name}</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="text-gray-700 font-semibold">Mobile:</span> {clerk.mobileNo}
                            </p>
                            <p className="text-gray-600">
                                <span className="text-gray-700 font-semibold">ID Number:</span> {clerk.id_number}
                            </p>
                            <p className="text-gray-600">
                                <span className="text-gray-700 font-semibold">Role:</span> {clerk.role}
                            </p>
                            <p className="text-gray-600">
                                <span className="text-gray-700 font-semibold">Hospital ID:</span> {clerk.hospital}
                            </p>
                            <button
                                onClick={() => handleDelete(clerk._id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClerksDetails
