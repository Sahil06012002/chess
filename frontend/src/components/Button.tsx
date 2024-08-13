
export default function Button({onclick,children} : {onclick : () => void, children : React.ReactNode})
{
    return <button className="px-4 py-2 border text-black" onClick={onclick}>
        {children}
    </button>
}