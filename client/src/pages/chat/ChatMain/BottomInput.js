import { useState } from 'react';
import EmojiPicker from '../../../component/EmojiPicker';
const BottomInput = () => {
    const [text, setText] = useState('');
    const handleChangeInput = (event) => {
        setText(event.target.value);
    }
    const addEmoji=(emoji)=>{
        setText(text.concat(emoji))
    }
    return (
        <div className="border px-4 py-2 flex items-center gap-5">
            <EmojiPicker addEmoji={addEmoji}/>
            <input value={text} className='border px-4 py-3 flex-1 rounded-md bg-backgroundSecondary ' onChange={handleChangeInput} placeholder='Type a message' />
        </div>
    )
}

export default BottomInput;