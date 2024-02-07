import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smiley, X } from '@phosphor-icons/react';
const EmojiPicker = ({ addEmoji }) => {
    const [showPicker, setShowPicker] = useState(false);
    return (
        <div className='relative'>
            {showPicker && (
                <div className='absolute [top:-442px] [left:0px]'>
                    <Picker data={data} onEmojiSelect={(value) => {
                        addEmoji(value.native)
                    }} />

                </div>
            )}
            <div className='icon-btn' onClick={() => setShowPicker(!showPicker)}>
                {!showPicker ? <Smiley size={26} /> : <X size={26} />}
            </div>
        </div>
    );
};

export default EmojiPicker;
