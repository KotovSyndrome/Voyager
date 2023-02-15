import { useEffect, useState } from "react";

{/* 

This custom hook implements the concept of debouncing to cut down on the amount of network calls when person types in the searchbar. 
The way it works is that this function only returns a value if the time between now and the last call of the funtion is greater than the delay.

This function is called everytime the query changes. The useEffect is called and if the query changes before the delay time (400ms), then the previous
call of the function is cleaned up by the anonymous function we return. In otherwords, new calls to useDebounce unmount the useEffect hook, which triggers
the clean up function. React cleans up effects from the previous render before running new effects. Which in turn means the debouncedValue is never updated
since the timeout function is cancelled. Lastly, we pass in value and delay to the useEffect dependency array so that it knows when to call the function
again.

*/}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
          }, delay)

        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export default useDebounce
