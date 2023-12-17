import React, { useRef, useState } from 'react'
import './imgGen.css'
import frame from '../assets/Frame.svg'
import ClipLoader from 'react-spinners/ClipLoader'

export const ImgGen = () => {

    const [img_url,setImg_url] = useState("/");
    const [loading,setLoading] = useState(false);
    let inputRef = useRef(null);

    const generate = async ()=>{
        if (inputRef.current.value ==="") {
            return 0;
        }
        setLoading(true);
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method:"post",
            headers:{
                "content-type":"application/json",
                Authorization:"Bearer sk-kUqZE1zx889qJp5nAE9MT3BlbkFJadIL2i56gCbxMMfUGN",
                "User-Agent":"chrome",
            },
            body:JSON.stringify({
                prompt:`${inputRef.current.value}`,
                model:"dall-e-2",
                n:1,
                size:"512x512",
            }),
        });
        let data = await response.json();
        // console.log(data);
        let data_array = data.data;
        setImg_url(data_array[0].url);
        setLoading(false);
    }

  return (
    <div className='container'>
        <div className='wrapper'>
            <div className='left'>
                <div className='image-box'>
                <img src={img_url === "/" ? frame:img_url} alt="" />
                </div>
            </div>
            <div className='right'>
                <form action="/">
                <button>Properties</button>
                <p>Size</p>
                <span>
                <input type="radio" name="size" id="size-1" value= "252x252" defaultChecked/>
                <label htmlFor="size-1">252x252</label>
                </span>
                <span>
                <input type="radio" name="size" id="size-2" value= "252x252"/>
                <label htmlFor="size-2">1024x1024</label>
                </span>
                <p>Keyword</p>
                <input type="text" ref={inputRef} className='search-input' placeholder='describe what you want to see' />
                <p>sample</p>
                <div className="sample">Realistic painting of a quiet moment between a child and their pet, with an emphasis on expression and mood.</div>
                <div className="gen-btn" onClick={()=>{generate()}}>
                    {loading?<ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"/>:"Generate"}</div>
                </form>
            </div>
        </div>
    </div>
  )
}
