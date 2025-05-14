const express=require('express');
const fs=require('fs');
const path=require('path');
const router=express.Router();

const booksPath=path.join(__dirname,'..','data','books.json');

const readBooks=()=>{
    const data=fs.readFileSync(booksPath,'utf-8');
    return JSON.parse(data);
}

const writeBooks=(book)=>{
    fs.writeFileSync(booksPath,JSON.stringify(book,null,2));
}

router.get('/',(req,res)=>{
    const books=readBooks();
    res.json(books);
})

router.get('/:id',(req,res)=>{
     const books = readBooks();
    const id = parseInt(req.params.id);
    const book = books.find(item => item.id === id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
})


router.post('/',(req,res)=>{
    const books=readBooks();
    newBook=req.body;

    newBook.id=books.length>0 ? books[books.length-1].id+1:1;

    books.push(newBook);
    writeBooks(books);

    res.status(201).json(newBook);
})

router.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const books=readBooks();
    let bookFound=false;

    for(let i=0;i<books.length;i++){
        if(books[i].id===id){
            books.splice(i,1);
            bookFound=true;
            break;
        }
    }
    
    if(!bookFound){
        return res.status(404).json({ message: 'Book not found' });
    }

    writeBooks(books);
    res.status(200).json({ message: 'Book deleted successfully' });
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateBook = req.body;

    const books = readBooks();
    let bookFound = false;
    let bookIndex = -1; 

    
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i] = { ...books[i], ...updateBook };
            bookIndex = i; 
            bookFound = true;
            break;  
        }
    }

    if (!bookFound) {
        return res.status(404).json({ message: 'Book not found' });
    }

   
    writeBooks(books);
    res.json(books[bookIndex]);  
});


module.exports=router;