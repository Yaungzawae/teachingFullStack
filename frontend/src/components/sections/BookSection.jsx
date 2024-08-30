import React from 'react';
import BookImage from '../../assets/Book.jpg'
import { H1 } from '../typography/typography';

function BookSection() {
  return (
    <div className="px-8 pt-10 pb-20">
        <H1 className="text-center mb-8">購買課本</H1>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <img 
          src={BookImage} 
          alt="Thai Course Books" 
          className="max-w-[600px] min-w-[380px]" 
        />

      <div className="mt-8 text-center">
        <div className="text-xl font-bold">最實用的泰文課本在這</div>
        <div className="text-sm text-gray-600 mt-2">(寄送部分目前只限台灣地區)</div>
        <ul className="text-left inline-block mt-4">
          <li>✅ Thai Chill 泰文生活雜誌</li>
          <li>✅ 泰文口說課本 Level 1-4</li>
          <li>✅ 泰國通_泰國旅遊課本</li>
          <li>✅ 泰文基礎讀寫課本</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default BookSection;
