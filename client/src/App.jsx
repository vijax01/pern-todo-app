import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {



     const [inputText, setText] = useState('');
     const [messages, setMessages] = useState([]);
     const [showEditModal, setShowEditModal] = useState(false);
     const [editWalaContent, setEditWalaContent] = useState({ id: '', text: '' });



     // add data in the database
     const handleSubmit = async () => {

          try {
               await axios.post('/save', {
                    text: inputText
               })
          } catch (err) {
               console.log("Here is the valuable error . ", err)
          }

          setText('');
          fetchMessages(); // refresh list after saving
     };



     // delete data from the database
     const handleDelete = async (id) => {
          if (confirm("Are you sure you want to delete this ?")) {
               try {
                    await axios.delete(`/delete/${id}`);
                    fetchMessages(); // refresh after delete
               } catch (err) {
                    console.log("Delete error . ", err)
               }
          }
          return;
     };



     // edit data from the database
     const handleEdit = async (id, text) => {
          setEditWalaContent({ id, text }); // selected note ka content state variable me save ho gaya 
          setShowEditModal(true); // modal open
     };



     // update data in the database
     const handleUpdateNote = async () => {
          await axios.put(`/update/${editWalaContent.id}`, { text: editWalaContent.text });
          setShowEditModal(false);
          fetchMessages();
     };



     // toggle checkbox in the database
     const toggleCompleted = async (id, checkboxValue) => {
          await axios.put(`/toggleCheckbox/${id}`, {completed: checkboxValue});
          fetchMessages();
     };



     // fetch messages from the database
     const fetchMessages = async () => {
          try {
               const res = await axios.get('/messages');
               setMessages(res.data);
          } catch (err) {
               console.log("Fetch error:", err);
          }
     };




     const hideEditModal = () => {
          setShowEditModal(false);
     }



     // this function runs once on the page load
     useEffect(() => {
          fetchMessages();
     }, []);




     return (
          <>
               <div className='relative min-h-screen w-full' >
                    <div className={`bg-black/40 absolute flex items-center justify-center inset-0 ${showEditModal ? '' : 'hidden'} `}>
                         <div className='pb-5 rounded-xl w-80 relative bg-white flex flex-col items-center' >
                              <div className='cursor-pointer absolute top-2 right-2' >
                                   <svg onClick={hideEditModal} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                              </div>
                              <h2 className='mb-4 mt-2 ' >Edit Note</h2>
                              <form onSubmit={(e) => { e.preventDefault(); handleUpdateNote(); }} className='flex' >
                                   <input className='border rounded-l pl-2 outline-none border-gray-300' type="text" value={editWalaContent.text} onChange={(e) => setEditWalaContent({ ...editWalaContent, text: e.target.value })} />
                                   <button onClick={() => handleUpdateNote()} type='submit' className='cursor-pointer h-7 w-15 rounded-r bg-linear-to-br  from-green-400 to-green-500' >Save</button>
                              </form>
                         </div>
                    </div>
                    <div className='h-14 w-full bg-linear-to-r from-slate-500 to-slate-700 p-5 flex items-center' >
                         <input className='p-2 pl-4 rounded-xl min-w-[30%] ml-4 border-slate-500 bg-slate-300 outline-none' value={inputText} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                   handleSubmit();
                              }
                         }} placeholder='Start typing here...' />
                         <button onClick={handleSubmit} className='p-2 px-3 ml-4 border cursor-pointer border-violet-500 bg-linear-to-br  from-violet-400 to-violet-500 rounded-xl' >Add Task</button>
                    </div>
                    <div className='p-4' >
                         <h3 className='text-2xl' >Todo Tasks :</h3>

                         {messages.length === 0 ? (
                              <p className="text-gray-500">
                                   You don't have any task, let's add one.
                              </p>
                         ) : (messages.map((msg, index) => (
                              <div className='flex items-center text-xl' key={msg.id}>
                                   <p onClick={() => toggleCompleted(msg.id, msg.completed)} className='mr-2 cursor-pointer flex' >
                                        {msg.completed ? (
                                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#4ade80" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                        ) : (
                                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10" /></svg>
                                        )}
                                   </p>
                                   <p className='mr-1 cursor-pointer' onClick={() => handleEdit(msg.id, msg.text)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>                              </p>
                                   <p className='mr-1 cursor-pointer' onClick={() => handleDelete(msg.id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                   </p>
                                   <p className={`${msg.completed ? 'line-through' : ''}`} >
                                        {(index + 1) + ". " + msg.text}
                                   </p>
                              </div>
                         ))
                         )}

                    </div>
               </div>
          </>
     );
}

export default App;