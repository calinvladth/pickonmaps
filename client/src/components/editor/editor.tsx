import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'

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

interface TextEditorInterface {
    text: string,
    onChange: (data: string) => void
}

function TextEditor({text, onChange}: TextEditorInterface) {
    return <ReactQuill theme="snow" value={text} onChange={onChange} formats={formats} modules={modules}/>
}

export default TextEditor