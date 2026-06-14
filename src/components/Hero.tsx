const Hero = () => {
    return (
        <section className="relative h-[70vh] overflow-hidden">
            <img
                src="/hero-tinogasta.webp"
                alt="Tinogasta"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div
                 className="absolute inset-0"
                style={{ backgroundColor: '#034659', opacity: 0.4}}
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-farley text-5xl md:text-7xl text-white mb-4">
                    TU HOGAR EN TINOGASTA
                </h1>
                <p className="font-fonseca text-lg md:text-2xl text-white max-w-2xl">
                    Te esperamos con los brazos abiertos para brindarte una experiencia inolvidable
                </p>
            </div>
        </section>
    )
}
export default Hero
