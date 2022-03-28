# Layout Overhaul Ideas

So far, I've support for copy and paste for the layout tree. But I have been playing around with the styles and code for the layout tab in order to provide a better user experience. 

### Increased visual effects within the tree

I think the tree itself largely looks good. My primary concern is that there might not be enough padding to keep things visually distinguishable, especially given how many subtrees there are. We're used to looking at tree structures, but I imagine that not everyone is as accustomed to it. I've set up two CSS rules in the template of the layout in order to demonstrate where we might add more padding or other visual effects in order to increase the contrast between the group/node the user is currently navigating and the rest of the tree.

![Padding demo](./padding_demo.gif?raw=true "Padding")

Additionally, the font family of the tree should probably be changed from a serif to a sans-serif by default. 

### Drag-and-Drop

I've implemented about 75% of drag-and-drop in order to conform to standard expectations about operations that can be performed within a tree structure. 

### Reorganizing controls

So far, the controls panel is in the greatest need of reorganization. The node properties seems to largely be good--it's a simple vertical list of keys with corresponding values. The Add, Move, Copy, Paste, Delete, and Return buttons, however, are all over the place. My current thinking is that we use a single row to house the properties and the "commands," but house them in separate columns as follows:

![controls panel reorganization](./controls_demo.png?raw=true "Controls")

I still have not decided exactly how I want to organize the dropdowns and buttons specifically, which is why they're haphazardly strewn about the container.

### WCAG colorscheme

Although not *strictly* related to the layout tab, while working on it, I noticed that our designer's colorscheme is a bit harsh on the eyes at times (at least on my browser, it looks mostly stark white by default). Seems like we should work on getting a decent colorscheme(s) set up. It's a small thing, but it's very helpful. And it might be something we don't necessarily need to do ourselves, but that another Project Open member can assist with (of course, we'd write the actual code, but settling on a set of styles could perhaps be delegated to someone else).

Things like high-contrast buttons with flat designs will go a long way to making the designer interface more user-friendly.