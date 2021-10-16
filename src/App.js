import React, { useState } from 'react';
import Title from './comps/Title';
import './App.css';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Model from './comps/Model';

const App = () => {

    const [selectedImg, setSelectedImg] = useState(null)

    return (
        <div>
            <Title />
            <UploadForm />
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && <Model selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
        </div>
    )
}

export default App;
