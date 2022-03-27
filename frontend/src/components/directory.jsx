import { useState } from "react";
import "./style.css"

function Directory({ directory, createFile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFileForm, setShowFileForm] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createFile(`${directory.path}/${newFileName}`);
    setNewFileName('');
  }


  if (directory.type === 'directory') {
    return (
      <div className={`directory ${isOpen ? 'expanded' : ''}`} >

        {/* Title */}
        <h2 className="title is-4">
          <span onClick={() => setIsOpen((x) => !x)}>
            📂
            {directory.path}
            {isOpen ? '⬇️' : '➡️'}
          </span>
          <span onClick={() => setShowFileForm((value) => !value)}>➕</span>
        </h2>

        <br />

        {/* New file form */}
        {showFileForm ?
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="input is-primary"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              type="text"
              placeholder="Filename" />
            <input
              type="submit"
              className="button is-primary" />
          </form>
          : ''}

        {/* Display contents */}
        {
          isOpen
          && directory
            .content
            .map((item) => <Directory directory={item} createFile={createFile} />)
        }
      </div >
    )
  }

  return <p className="file">📝{directory?.path?.split('/')?.pop()}</p>
}

export default Directory;
