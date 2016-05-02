
CSS organization
================

[WIP] This is an example of CSS organization using PostCSS.

## Tools
- [Gulp](http://gulpjs.com/)
- [cssnext](http://cssnext.io/) (collection of [postcss](https://github.com/postcss/postcss) plugins)


## Installation
```
npm install
```


## Usage
```
cd /path/to/docroot

# Watch (default Gulp task)
gulp
```

## Principles

Some fundamentals from @necolas's [HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) - namely : preference to use the "multi-class" pattern, more scalable.

Most importantly : [CSS Guidelines](http://cssguidelin.es/) - sections _Architectural Principles_, _CSS Selectors_, and _Specificity_ : use @csswizardry's methodology - [applying traditional software engineering to CSS](https://speakerdeck.com/csswizardry/css-for-software-engineers-for-css-developers) (see also this [video conference](https://vimeo.com/140641366)).  

Very quick / overview notes :  
- DRY / Single Source of truth - warnings : don't DRY if it's repeated coincidentally, just avoid duplicating data in source (repetition in compiled code is fine).
- Single Responsability (context encapsulation, composability) : do one thing, and one thing well - break into individual concerns.
- Separation of concerns - notably : don't bind JS onto CSS classes
- Immutability - the only time to use !important
- Open/Closed principle : never change anything at its source, always make change via extension - possibly the most useful principle for dealing with other people's code.
- Orthogonality : avoid collisions - ex: using proper scoping
- Moustache Principle : just because you can, it doesn't mean you should.


## Structure
Here are suggestions for organizaing CSS files, mostly folders and files naming conventions. This section will be updated to elaborate on different approaches.

```
path/to/project/
    └── css/
        ├── base/           <- 1
        │   └── ...
        ├── generic/        <- 2
        │   └── ...
        ├── specific/       <- 3
        │   └── ...
        ├── node_modules/   <- (gitignored deps)
        │   └── ...
        ├── index.css       <- Input (compilation entry point)
        ├── main.css        <- Output (compiled result)
        └── critical.css    <- 4
```
### 1. `base/` : Bare HTML tags & global declarations
File naming : begin with `_` + use categories from [Josh Duck’s HTML Periodic Table](http://smm.zoomquiet.io/data/20110511083224/index.html) ([Screenshot](http://bradfrost.com/wp-content/uploads/2012/11/Screen-Shot-2012-11-13-at-5.15.05-PM.png)) + [optional] use double extension `.vas.css` for files containing "low-level" variables.  
Exception : headings can be in their own separate file, as their typographic nature could be considered beetween text-level semantics and sectionning (hierarchy).  
Additional considerations :  
- @jonathantneal's [Sanitize.css](https://github.com/10up/sanitize.css) or @necolas's [Normalize](https://github.com/necolas/normalize.css/)
- @mrmrs_'s [tachyons-box-sizing](https://github.com/tachyons-css/tachyons-box-sizing)
- Bits and pieces to adapt from @paulrobertlloyd's [Barebones](https://github.com/paulrobertlloyd/barebones)

Note : some base styles are specific (default tags appearance / low potential for reuse).  
@bradfrost's terminology : **Atoms**

### 2. `generic/` : Immutable Utilities, Objects, Components
Styles with potential for reuse. Ideally, these should only be vendor styles (`node_modules`), but sometimes we need a place to start something reusable outside of the other folders.  
Examples :  
- SUIT CSS [components-flex-embed](https://github.com/suitcss/components-flex-embed) or [components-arrange](https://github.com/suitcss/components-arrange)
- @mrmrs_'s [colors](https://github.com/mrmrs/colors)
- etc.

@bradfrost's terminology : usually **Molecules**, maybe even **Organisms**

### 3. `specific/` : Current Project Styles
Low potential for reuse, but these styles shouldn't necessarily be unstructured either.  
Within that folder, the organization should accomodate the size of the current project, and/or personal preference - ex : transposing @HugoGiraudel's [Architecture for a Sass Project](http://www.sitepoint.com/architecture-sass-project/)  
Examples :  
- Variables overrides (media queries values, objects and utilities customizations, etc.)
- Variations, extensions of objects ("specialization" of generic styles)
- *Theme* modifiers (as in @csswizardry's namespace terminology)
- Custom components

@bradfrost's terminology : should mostly relate to **Organisms**, **Templates** and **Pages**, but could also include lower-level styles like **Molecules**.

File naming convention may also follow [InuitCSS's file naming conventions](https://github.com/inuitcss/getting-started).

### 4. `critical.css`
Experimental / to discuss :  
This file is the result of a separate compilation, taking any CSS file ending with `.critical.css` (double extension), and optionally (TODO : compilation options) folders like `base/` or `generic/` (as the main layout and typography are usually abstracted - like grids, widths, box-model measures or scales).  
Alternative tool to generate this file : @filamentgroup's [criticalCSS](https://github.com/filamentgroup/criticalCSS)
More info :
- @adactio's [Inlining critical CSS for first-time visits](https://adactio.com/journal/8504)
- @filamentgroup's [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html)
- @chriscoyier's [Authoring Critical Above-the-Fold CSS](https://css-tricks.com/authoring-critical-fold-css/)


## CSS Conventions and Coding Style
- @csswizardry's [Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) (see [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/))  
- Additional namespaces (custom class prefixes) :  
    · `fx-` : effects or interactions  
    · `b-` : box-model utilities : borders  
    · `m-` : box-model utilities : margins  
    · `p-` : box-model utilities : paddings  
- (to discuss) Double extension `.critical.css` for separate inline "critical" CSS compilation  
- Formatting / coding style :  
    · Use [BEM-like Naming](http://cssguidelin.es/#bem-like-naming)  
    · Tolerate [SUIT CSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)  
    · [Meaningful Whitespace](http://cssguidelin.es/#meaningful-whitespace)  
- Components :  
    · (to discuss) Additional namespace by vendor for portability (e.g. `fx-paulmicha-foobar`) ?  
    · And/or implement dynamic prefixes à la InuitCSS ?
