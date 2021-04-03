const mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

const data = [
    {
        title: "Skyy",
        image: "https://images.unsplash.com/photo-1598644656788-c77be17dfc56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1677&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non posuere mauris. Fusce a arcu dui. Integer iaculis faucibus ex sed laoreet. Donec sagittis mollis enim at interdum. Morbi malesuada orci sit amet felis porttitor egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis consequat elit. Nulla arcu urna, scelerisque nec eros in, hendrerit pulvinar sem. Cras venenatis dignissim placerat."
    },
    {
        title: "Stars",
        image: "https://images.unsplash.com/photo-1598735810846-95cdc1e20150?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1766&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non posuere mauris. Fusce a arcu dui. Integer iaculis faucibus ex sed laoreet. Donec sagittis mollis enim at interdum. Morbi malesuada orci sit amet felis porttitor egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis consequat elit. Nulla arcu urna, scelerisque nec eros in, hendrerit pulvinar sem. Cras venenatis dignissim placerat."
    },
    {
        title: "Bridge campou",
        image: "https://images.unsplash.com/photo-1598598136467-ac3e61770d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non posuere mauris. Fusce a arcu dui. Integer iaculis faucibus ex sed laoreet. Donec sagittis mollis enim at interdum. Morbi malesuada orci sit amet felis porttitor egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis consequat elit. Nulla arcu urna, scelerisque nec eros in, hendrerit pulvinar sem. Cras venenatis dignissim placerat."
    }
];

async function seedDB() {
    // Remove all camps
    
    await Campground.deleteMany({});
    await Comment.deleteMany({});

    for (const seed of data) {
        let campground = await Campground.create(seed);
        let comment = await Comment.create({
            text: "This place is great by i wish internet",
            author: "Homer"
        });
        campground.comments.push(comment);
        campground.save();
    }
}

module.exports = seedDB;