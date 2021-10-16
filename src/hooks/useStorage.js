import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null)

    useEffect(() => {

        const storageRef = projectStorage.ref( 'react-photo-gallery/' + file.name);

        const collectionRef = projectFirestore.collection('react-photo-gallery');

        storageRef.put(file).on('state_changed', (snap) => {

            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err)
        }, async () => {
            const imgUrl = await storageRef.getDownloadURL()
            const createdAt = timestamp();
            await collectionRef.add({ imgUrl, createdAt })
            setUrl(imgUrl)
        })
       
    }, [file])

    return { progress, error, url  }
}

export default useStorage;
