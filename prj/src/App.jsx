import { useEffect, useState } from "react";


const App = () => {
    const Images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLat8bZvhXD3ChSXyzGsFVh6qgplm1KhYPKA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxbhQpDEuFsnVwrYGw3432VO3RCI_hVo71A&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrycXqkPdjdCekiOndVlZ2XrBw7QqXMDfmQ&s',
    "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGsWvD8He2tWT7KN-tZcTLIZrGxcXdOJuHw&s",
    "https://www.w3schools.com/w3css/img_lights.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyHChbPbMcLp_A2x6PZU3FW-mq-vBBQgjVw&s",
    "https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/newseventsimage_1679401672742_mainnews2012_x1.jpg"
    ];

    const[selectedindex, setselectedindex] =  useState(0);    //current image index
    const [ismodalopen , setismodalopen] = useState(false);  // modal state change
    const [dark ,setdark] = useState(false); // dark mode change button
    const [fadeTransition , setFadeTransition] = useState(false);


    useEffect(() => {      //autoslide show with interval
        if(ismodalopen) return   // pause jbb modal open hoga
        const interval = setInterval(()=> {
            setselectedindex((previndex) => (previndex+1) % Images.length);
        },3000);
        return () => clearInterval(interval);
        },[Images.length,ismodalopen]);

        const handleclick = () => {     //handling image on click
            setismodalopen(true);
        };

        const closeModal = () => {
            setismodalopen(false);
        };


        useEffect(() => {      //swipe support for mobile
            const handleswipe = (e) =>{
                if(e.deltaX  < -50) {
                    nextImage();
                } else if (e.deltaX>50){
                    prevImage();
                }
            };

            window.addEventListener('pointerup' , handleswipe);
            return () => window.removeEventListener('pointerup' , handleswipe);
        },[]);

        const nextImage = () => {
            setselectedindex((prev) => (prev+1)% Images.length);
        };

        const prevImage = () => {
            setselectedindex((prev) => (prev -1 + Images.length) % Images.length);
        };

        const handlechange = (newIndex) => {
            setFadeTransition(true);
            setTimeout(() => {
               setselectedindex(newIndex)
               setFadeTransition(false) 
            }, 300);
        };

        useEffect(() => {    // handle with keyboard buttons left and right key
            const handlekey = (e) => {
                if(e.key === 'ArrowRight') nextImage();
                if(e.key === 'ArrowLeft') prevImage();
                if(e.key === 'Escape') closeModal();
            };

            window.addEventListener('keydown', handlekey);
            return () => window.removeEventListener('keydown', handlekey);
        },[]);

    return(

        <div className={`min-h-screen ${dark ? 'bg-black-900 text-white'   : 'bg-gray-100 text-gray-800'} flex flex-col items-center py-10 px-4`}>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">image Gallery</h1>
            <button 
            onClick={() => setdark(!dark)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Toggle {dark ? 'light' : 'Dark'} Mode
            </button>

             <div className="relative group flex items-center gap-4">
                <button
                onClick={prevImage}
                className="px-3 py-2 bg-gray-300 dark : rounded hover : scale-110"
                >
                    Prev
                </button>
            <img   //main image slideshow coming
            src={Images[selectedindex]}
            alt={`Main ${selectedindex}`}
            loading="lazy"
            className={`w-full h-full object-cover rounded-xl shadow-xl cursor-pointer transitions-opacity duration-500 ease-in-out ${fadeTransition ? `opacity-0` : `opacity-100`}`}/>
            <span className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded-xl shadow-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={handleclick}
            >Zoom</span>

            <button   // giving next image
            onClick={nextImage}
            className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:scale-110"
            >
                Next
            </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {Images.map((img,index) => (
                    <img
                    key={index}
                    src={img}
                    loading="lazy"
                    alt ={`Thumb ${index}`}
                    onClick={() => setselectedindex(index)}
                    className={`w-24 h-16 object-cover rounded-md boreder-2 cursor-pointer transition-all duration-200 ${
                        selectedindex === index
                        ? 'border-blue-500 scale-105'
                        : 'border-transparent hover:scale-105'
                        }`}
                        />
                ))}
            </div>
            {ismodalopen && (
                <div className="fixed inset -0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                onClick={closeModal}
                >
                    <img
                    src={Images[selectedindex]}
                    alt="zoomed"
                    className="max-w-[90%] max-h-[80%] object-contain rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default App