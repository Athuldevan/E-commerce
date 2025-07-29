

const ProductView = ({selectedProduct,onClose }) => {


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[5px]">
            <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-xl border border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold">selectedProduct? Details</h3>
                    <buttonn onClick = {onClose} className="p-1 rounded-md hover:bg-gray-700 text-gray-200 hover:text-gray-200">
                        {/* x button  */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </buttonn>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* selectedProduct? Image and Basic Info */}
                    <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-20 h-20 rounded-lg ${selectedProduct?.images[0]} flex items-center justify-center text-white text-2xl font-bold`}>
                            {selectedProduct?.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">{selectedProduct?.name}</h4>
                            <p className="text-sm text-gray-400">{selectedProduct?.id}</p>
                            <div className="mt-2 flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    selectedProduct?.status === 'In Stock' ? 'bg-green-900 text-green-200' :
                                    selectedProduct?.status === 'Low Stock' ? 'bg-yellow-900 text-yellow-200' :
                                    'bg-red-900 text-red-200'
                                }`}>
                                    {selectedProduct?.status}
                                </span>
                                <span className="text-sm text-gray-200">{selectedProduct?.stock} in stock</span>
                            </div>
                        </div>
                    </div>

                    {/* selectedProduct? Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg text-gray-200">Category</p>
                            <p className="font-medium">{selectedProduct?.category}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-200">Price</p>
                            <p className="font-medium">{selectedProduct?.price}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-200">Total Rating</p>
                            <p className="font-medium">{selectedProduct?.rating}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-200">Price</p>
                            <p className="font-medium">{selectedProduct?.price}</p>
                        </div>
                    </div>

                    {/* selectedProduct? Description */}
                    <div>
                        <p className="text-lg text-gray-200 mb-2">Description</p>
                        <p className="text-sm">{selectedProduct?.description}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t border-gray-700">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;