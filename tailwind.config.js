module.exports = {
    purge: [
        "./src/components/**/*.vue" ,
        "./src/layouts/**/*.vue"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundSize: {
                '90%': '90%' ,
                '85%': '85%' ,
                '80%': '80%' ,
                '75%': '75%' ,
                '50%': '50%' ,
                '25%': '25%' ,
                '10%': '10%' ,
                '10px': '10px' ,
                '20px': '20px' ,
                '30px': '30px' ,
                '40px': '40px' ,
                '50px': '50px' ,
                '60px': '60px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}