import React from 'react';

const ClerksDetails = ({ clerks, setClerks }) => {
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
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#4c5270' }}>Clerk Details</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                    <label className="block mb-2 font-semibold" style={{ color: '#4c5270' }}>Search by Name</label>
                    <input
                        type="text"
                        placeholder="Filter by name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="p-3 w-full border rounded-md"
                        style={{ borderColor: '#bcece0', outline: 'none' }}
                    />
                </div>
                
                <div className="flex-1">
                    <label className="block mb-2 font-semibold" style={{ color: '#4c5270' }}>Filter by Role</label>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="p-3 w-full border rounded-md bg-white"
                        style={{ borderColor: '#bcece0', outline: 'none' }}
                    >
                        <option value="">All Roles</option>
                        {uniqueRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClerks?.map((clerk) => (
                    <div 
                        key={clerk._id} 
                        className="rounded-lg overflow-hidden shadow-md transition-transform hover:scale-102"
                        style={{ backgroundColor: '#bcece0' }}
                    >
                        <div className="p-4" style={{ backgroundColor: '#36eee0' }}>
                            <h3 className="text-xl font-bold" style={{ color: '#4c5270' }}>{clerk.name}</h3>
                        </div>
                        
                        <div className="p-4 space-y-2">
                            <div className="flex items-center">
                                <span className="font-semibold" style={{ color: '#4c5270' }}>Mobile:</span>
                                <span className="ml-2">{clerk.mobileNo}</span>
                            </div>
                            
                            <div className="flex items-center">
                                <span className="font-semibold" style={{ color: '#4c5270' }}>ID Number:</span>
                                <span className="ml-2">{clerk.id_number}</span>
                            </div>
                            
                            <div className="flex items-center">
                                <span className="font-semibold" style={{ color: '#4c5270' }}>Role:</span>
                                <span className="ml-2">{clerk.role}</span>
                            </div>
                            
                            <div className="flex items-center">
                                <span className="font-semibold" style={{ color: '#4c5270' }}>Hospital ID:</span>
                                <span className="ml-2">{clerk.hospital}</span>
                            </div>
                            
                            <button 
                                onClick={() => handleDelete(clerk._id)}
                                className="w-full mt-4 py-2 rounded text-white font-medium transition-colors"
                                style={{ backgroundColor: '#f652a0', hover: { backgroundColor: '#e53e91' } }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredClerks?.length === 0 && (
                <div className="text-center p-8 rounded-lg mt-6" style={{ backgroundColor: '#bcece0', color: '#4c5270' }}>
                    <p className="text-lg font-medium">No clerks found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ClerksDetails;