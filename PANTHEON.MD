# Wordpress Development with Flynt and Pantheon

We will discuss on how we can install and configure Flynt to work in Pantheon Environment


## Installation

- Setup a fresh Pantheon Environment, or use an existing one.
- Install **ACF Pro**. This is **required** if you want to develop a Wordpress theme using Flynt.
- Download/Clone the [Flynt Wordpress Starter Theme](https://github.com/flyntwp/flynt) and put it inside `wp-content/themes` folder inside your Wordpress instance.
- Open the terminal inside your new Flynt theme. Assuming you already have `composer` installed on your system, run `composer install` to install all the vendor packages required for the theme.
- Inside the `.gitignore` file in your theme, comment out the lines below (line 1-2)
  `# /Components/PremiumComponents/`
  `# /dist`
  This is done to include `dist` folder when you push your code to Pantheon environment.
- Assuming you have **node = v12** installed, run `npm install` to install all required packages for your theme development.
- Run `npm run build` to create production-ready files for the installed theme.
- Activate the theme from your Wordpress Dashboard. **The theme is installed and ready to use**.
- Optionally, you can now delete all pre-installed Wordpress themes and plugins that comes with a fresh Wordpress installation.
- **Push** the code to the Pantheon environment.


## Enable SCSS and CSS Source-maps

This is the important step**. On your `webpack.config.js` file of your Flynt theme, you have to enable **SCSS** and **CSS** source-maps in order to develop and debug CSS code on inspector. Flynt does not provide this feature out-of-box, but luckily we can enable them. In your `webpack.config.js` file, 

- **Find** the line `loader:  'css-loader',`. Inside its `options` and a new option line `sourceMap: !production`.
- **Find** the line `loader:  'postcss-loader',`. Inside its `options` and a new option line `sourceMap: !production`.
- **Find** the line `loader:  'sass-loader',`. Inside its `options` and a new option line `sourceMap: true`.


## Improve Configuration

There are few things you can to do configure your Flynt theme better!

- Add `.nvmrc` . Put `v12.22.12` inside it, this is the last stable version of node v12. **Flynt is dependent on node v12 for development**.
- **For fonts, it is better to preload them** inside `wp-content/themes/flynt/templates/_document.twig` rather than putting them inside `wp-content/themes/flynt/assets/fonts` folder, for **better performance score**.

Rest of the configuration can be done by following the steps provided in the [Flynt Documentation](https://github.com/flyntwp/flynt)


## Create new Components

Every Flynt component either prefixed with `Block`, `List`, `Grid`, etc.  Flynt [Yeoman Generator](https://github.com/flyntwp/generator-flynt) helps us understand what these different prefixes mean and how can we create our own new component as per our need. Below are the different Flynt component types, with prefixes, explain what they are and how we can utilise them.

```
[
	{
		"name": "Accordion",
		"value": "Accordion"
	},
	{
		"name": "Block (A component without any further specification)",
		"value": "Block"
	},
	{
		"name": "Form",
		"value": "Form"
	},
	{
		"name": "Grid (Specific count of items per row)",
		"value": "Grid"
	},
	{
		"name": "Hero (Large section header)",
		"value": "Hero"
	},
	{
		"name": "List (Items in a horizontal or vertical list)",
		"value": "List"
	},
	{
		"name": "Modal",
		"value": "Modal"
	},
	{
		"name": "Navigation",
		"value": "Navigation"
	},
	{
		"name": "Slider",
		"value": "Slider"
	},
	{
		"name": "Video",
		"value": "Video"
	},
	{
		"name": "Custom (Manually specify a category within the component name)",
		"value": false
	}
]
```

For example, if you have to create a a modal for video embed, you can use name your component as `ModalVideoOembed` . Similarly, if you want to create a Hero with background image and CTA, you can name your component as `HeroImageCta`. Please not all component names should be **PascalCase**.


## HTML  Guide

Flynt uses class-naming convention as defined in [Maintainable CSS](https://maintainablecss.com/chapters/conventions/) approach. Below are some of the **snippets** of CSS classes used internally by Flynt.

```
<div class="flyntComponent componentSpacing flyntComponent–sizeSmall" is="flynt-block-example"></div>

<div class="flyntComponent componentSpacing flyntComponent–sizeMedium" is="flynt-block-example"></div>

<div class="flyntComponent componentSpacing flyntComponent–sizeLarge" is="flynt-block-example"></div>

<div class="box box--imageLeft">
    <div class="box-inner box-inner--content"></div>
    <div class="box-inner box-inner--image"></div>
</div>

<div class="logo">
	<img src="" alt="" class="logo-image"></img>
</div>

<figure class="figure">
	<img src="" alt="" class="figure-image figure-image--isHidden"></img>
	<svg class="figure-image-svg"></svg>
</figure>

<div class="video">
	<div class="video-player">
		<div class="video-loader"></div>
		<button class="video-playButton" type="button" aria-label="Play Video"></button>
	</div>
</div>

<div class="content content--textAlignLeft">
	<h2 class="content-title"></h2>
	<div class="content-text">
		<img src="" alt="" class="content-image">
		<p class="content-excerpt"></p>
	</div>
</div>

<div class="component">
	<a href="" class="component-link"></a>
	<div class="component-imageWrapper">
		<img src="" alt="" class="componentImage">
	</div>
	<h4 class="componentTitle"></h4>
	<p class="componentDescription"></p>
</div>

<div class="author">
	<a href="" class="author-avatarLink"></a>
	<img src="" alt="" class="author-avatarImage">
</div>

<div class="grid">
	<div class="grid-item"></div>
</div>

<div class="slider">
	<div class="slider-item"></div>
</div>
```

For more ideas for CSS classnames, you can get reference from [Bulma](https://bulma.io/). It has similar class-naming convention as in Flynt.

### Other Important Pointers

- If you have a confusion on how to write HTML, which tag is best suited where and how to improve accessibility, you should follow [HTML Specifications](https://html.spec.whatwg.org/).
- If the entire component/module is clickable, it is better to wrap it inside `<a>` tag. Flynt follows this approach [here](https://flyntwp.com/components/).


## SCSS/CSS Guide

Flynt follows [Maintainable CSS](https://maintainablecss.com/) approach to write SCSS/CSS code. Please read the Maintainable CSS documentation thoroughly. 

Furthermore, there is always a confusion on how to write code for a single element in SCSS. Below is the snippet that will help you understand on how to write code for a single element in SCSS.

```
.custom-element {
	@extend  .placeholder;
	@include  mixin();
	property: value;

	@media (min-width: $breakpoint-mobile) {}

	@media (min-width: $breakpoint-tablet) {}

	@media (min-width: $breakpoint-desktop) {}

	span {}

	div {}

	.child-class {}  

	&:pseudo-state {}

	&.has-modifier {}

	&.is-state {}
}
```

After understanding the above snippets, **you can also create your own modules in HTML**, such as

```
<div class="intro">
	<span class="intro-eyebrow"></span>
	<h2 class="intro-headline"></h2>
	<p class="intro-blurb"></p>
	<div class="intro-groupContainer">
		<a href="" class="intro-cta"></a>
	</div>
</div>
```

Often, **there is a problem with naming an element when it holds the grid column property**, as the rows and column property cannot be applied to same div. We can overcome this issue by using an extra div, such as `article-outer` in below example, to just hold the grid column property.

```
<div class="article-outer">
	<div class="article">
		<span class="article-eyebrow"></span>
		<h2 class="article-headline"></h2>
		<p class="article-blurb"></p>
		<div class="article-groupContainer">
			<a href="" class="article-cta"></a>
		</div>
	</div>
</div>
```

Thus for every wrapper `div` that acts as a column, we can use the convention `childClassname-outer` to give as a CSS class to that `div`.

### Other Important Pointers

- If you are thinking of improving the SCSS code/structure for Flynt, you should follow [SCSS Guidelines](https://sass-guidelin.es/#too-long-didnt-read).


## Backend/Integration Guide

- Flynt uses Twig/Timber as a template engine for components. You must read [Timber documention](https://timber.github.io/docs/guides/cheatsheet/) in order to integrate Flynt components.


