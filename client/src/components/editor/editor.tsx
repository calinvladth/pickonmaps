import {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'
import {useDispatch, useSelector} from "react-redux";
import {onPickEdit, selectMap} from "../../slices/mapSlice";

const modules = {
    toolbar: [
        [{'header': [1, 2, 3, false]}],
        ['bold', 'underline', 'strike'],
        ['link'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
    ],
}

const formats = [
    'header',
    'bold', 'strike', 'underline',
    'list', 'bullet', 'indent',
    'link', 'image'
]

function TextEditor() {
    const {pick} = useSelector(selectMap)
    const dispatch = useDispatch()

    return <ReactQuill theme="snow" value={pick.text} onChange={(data) => dispatch(onPickEdit({text: data}))} formats={formats} modules={modules}/>
}

export default TextEditor