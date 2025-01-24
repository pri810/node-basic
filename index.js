const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/basic',)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
    // Define a Profile schema
const profileSchema = new mongoose.Schema({
    id:Number,
    link: String,
    name: String,
    desc: String
  });
  // Create a Profile model
const Profile = mongoose.model('Profile', profileSchema);

const data = [
    {
        "id": "1",
        "name": "prince",
        "address": {
        "city": "Munbra",
        "state": "Maha"
        },
        "images": [
            "img1",
            "img2"
        ],
        "imagesWithKey": [
            {
                "path": "images",
                "name": "img3"
            },
            {
                "path": "images",
                "name": "img1"
            }
        ]
    },
    
        {
            "id": "2",
            "name": "basheer",
            "address": {
            "city": "Munbra",
            "state": "Maha"
            },
            "images": [
                "img1",
                "img2"
            ],
            "imagesWithKey": [
                {
                    "path": "images",
                    "name": "img3"
                },
                {
                    "path": "images",
                    "name": "img2"
                }
            ]
        },
        {
            "id": "3",
            "name": "nawaf",
            "address": {
            "city": "Munbra",
            "state": "Maha"
            },
            "images": [
                "img1",
                "img2"
            ],
            "imagesWithKey": [
                {
                    "path": "images",
                    "name": "img1"
                },
                {
                    "path": "images",
                    "name": "img3"
                }
            ]
        }
    
]

const profiles = [
    {
        "id": 1,
        "link": "Coder",
        "name": "prince",
        "desc": "I am a full stack devoloper"
    },
    {
        "id": 2,
        "link": "Saad",
        "name": "Saad",
        "desc": "I am a full stack devoloper"
    },
    {
        "id": 3,
        "link": "Nawaf",
        "name": "Nawaf", 
        "desc": "I am a full stack devoloper"
    }
]

app.get('/', (req, res) => {
    res.send("Hi search for Profiles")
})


app.get('/profile/:id', async (req, res) => {
    const newId = req.params.id;
    const profile = await Profile.findOne({id:newId});
    // const profile = profiles.find((profile) => {
    //     return profile.id == id
    // })
    res.send(profile ?? "Not Found.");
})

app.get('/profiles',async (req, res) => {
    const profiles = await Profile.find();
    res.send(profiles);
    // res.status(200).json(profiles)
    
})

app.post('/profileCreate/', async (req, res) => {
    const profile = req.body;
    const newProfile = new Profile(profile);
    await newProfile.save();
    const profiles = await Profile.find();  
    // profiles.push(profile) 
    res.status(201).json(profiles); 
})

app.put('/profileUpdate/', async (req, res) => {
    const profile = req.body;  
    const result = await Profile.updateOne(
        {id: profile.id},
        {$set: profile}
    );
    if ( result.matchedCount === 0)
        res.status(400).json("not Found...");
    const profiles = await Profile.find();
    res.status(200).json(profiles);
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == newProfile.id
    // })
    // if(profileIndex == -1){
    //     res.status(404).json("Not Found.");
    // }
    // profiles[profileIndex] = newProfile;
    // res.status(200).json(profiles);
})

// delete the old profile delete 
app.delete('/profileDelete/:id', async (req,res)=>{
    const id = req.params.id;
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == id
    // })
    const profile = await Profile.findOneAndDelete({id: id});
    if(!profile){
        req.status(404).json('Not Found....');
    }

    const profiles = await Profile.find();
    // profiles.splice(profileIndex,1)
    res.status(200).json(profiles);
})

app.get ('/home',(req,res)=>{
    const result = data.filter((item)=>{
        const naam = item.imagesWithKey.findIndex((obj)=>{
            return obj.name == "img1"
        })
        if (naam == -1) {
            return false;
        }else{
            return true;
        }
    })
    res.send(result)

})

app.listen('8000', () => {
    console.log("Server is running on 8000...")
})
