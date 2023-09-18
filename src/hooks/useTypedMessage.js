import { useEffect } from "react";

export const useTypedMessage = (message) => {

    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {

    }, [message]);

    return typedMessage;
};