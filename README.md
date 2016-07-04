
CSS organization
================

This is an example of CSS organization using PostCSS.

The source code included in this repository is generously allowed to be made publicly available under the MIT license by [Chouette - Institut de français](https://www.chouette.net.br/).

This repository is only meant to provide context in the form of a case study to evaluate and discuss the design of an [open-source reusable component library](https://github.com/reusable-components) (ex: [@mikaelsandin's series of articles](https://medium.com/building-a-component-library) for the *City of Gothenburg*), with the objective of laying the fondations of an elaborate design system (ex: [GE’s Predix Design System](https://medium.com/ge-design/ges-predix-design-system-8236d47b0891)).


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

- Some fundamentals from @necolas's [HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) - namely : preference to use the "multi-class" pattern, more scalable.
- [CSS Guidelines](http://cssguidelin.es/) - sections _Architectural Principles_, _CSS Selectors_, and _Specificity_ : use @csswizardry's methodology - [applying traditional software engineering to CSS](https://speakerdeck.com/csswizardry/css-for-software-engineers-for-css-developers) (see also this [video conference](https://vimeo.com/140641366)).
- [@snookca's Considerations in Component Design](https://snook.ca/archives/html_and_css/component-design).

Very quick overview notes :
- DRY / Single Source of truth - warnings : don't DRY if it's repeated coincidentally, just avoid duplicating data in source (repetition in compiled code is fine).
- Single Responsability (context encapsulation, composability) : do one thing, and one thing well - break into individual concerns.
- Separation of concerns - notably : don't bind JS onto CSS classes
- Immutability - the only time to use !important
- Open/Closed principle : never change anything at its source, always make change via extension - possibly the most useful principle for dealing with other people's code.
- Orthogonality : avoid collisions - ex: using proper scoping
- Moustache Principle : just because you can, it doesn't mean you should.
- Depth of Applicability : number of generations that are affected by a given rule. The further the distance from the parent to the deepest descendent element, the more complex and rigid the HTML structure needs to be for the selectors to work.
- Component Boundaries : if the component is more than 3 levels deep, it might be up for breaking apart into smaller components.
- Shell/Content Pattern : often, there’s a shell (container), and then the content that goes within that - can be a great way to recognize when to break things down from one larger component into a few smaller components.


## Existing approaches

The organization of CSS in various libraries or frameworks usually aims to avoid common pitfalls of the *cascading* part of CSS in modular design system (i.e. preventing the accidental bleeding of rules).

[@dakotaleemartinez provides an example](https://medium.com/@dakotaleemartinez/keeping-your-css-dry-with-tachyons-bb1c0dc66dce) of a problematic Bootstrap 3 navbar component extension, illustrating some of the pains these approaches aim to ease.

[@ahfarmer's article](http://andrewhfarmer.com/how-to-style-react/) gives a categorization of the tooling available as of 2016/04/16, and [@fat's talk](https://www.youtube.com/watch?v=iniwPUEbPUM) touches upon the origins of CSS, putting its evolution and uses in perspective - along with [@zackbloom's "The Languages Which Almost Became CSS"](https://eager.io/blog/the-languages-which-almost-were-css/).

I find there are 2 types of approaches to "kill the cascade" in CSS :

- Class naming conventions - ex: eCSS, ITCSS, etc (see below). This is the currently favored approach.  
Such conventions already allow for implementing robust organization, and for projects that aren't going to need the kind of scaling that eCSS, ITCSS and the like are providing, we still can have the flexibility of a [SMACSS-based approach](https://snook.ca/archives/html_and_css/dealing-with-cascade-specificity), which means either picking classes or child selectors where appropriate - provided any potential "bleed" is at least documented and/or its scope really narrow.
- Inlining all or most styles : see [@chriscoyier's recap](https://css-tricks.com/the-debate-around-do-we-even-need-css-anymore/). And if we chose only to use utility classes (see below), [Tachyons](http://tachyons.io/) could also be used this way, and could get along with the naming convention approach above - provided we avoid class naming collisions.  
[Atomic CSS](http://acss.io/) is probably the most explicit "inline-like" use of CSS classes.  
Some tools even implement their own syntax (compiled to CSS) to achieve more advanced layout features, like [gridstylesheets.org's GSS](https://github.com/gss/engine) (inspired by [Constraint CSS](http://constraints.cs.washington.edu/web/ccss-uwtr.pdf) and [Apple's Visual Format Language](http://gridstylesheets.org/guides/vfl/)).


## Architecture

The organization of CSS may follow some categorization of styles. There is hardly one unique way of sorting out the styles for all imaginable projects out there, so this has to stay subjective (because a single generic architecture may not always be the most appropriate for projects of different size or nature).

However, following some logic helps in reducing time spent in making "structural" decisions (good architecture = less questions to ask) - here's an illustration of ITCSS's :  
![ITCSS categories](Inverted-Triangle.jpg)


## File structure
Here are suggestions for organizaing CSS files :

### Centralized, Single CSS folder
Current structure of the source code available as an example in this repository (comes from a Drupal 7 theme).
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

### Modular, Component-oriented structure
Similar to [eCSS file organization (ch.5)](http://ecss.io/chapter5.html), inspired by [@necolas's talk](https://www.youtube.com/watch?v=m0oMHG6ZXvo).
```
path/to/project/modules/
    ├── node_modules/       <- (gitignored deps)
    │   ├── sanitize.css/
    │   └── ...
    ├── base/               <- 1
    │   ├── my-component/   <- *
    │   │   └── ...
    │   └── ...
    ├── generic/            <- 2
    │   ├── my-component/   <- *
    │   │   └── ...
    │   └── ...
    ├── specific/           <- 3
    │   ├── my-component/   <- *
    │   │   └── ...
    │   └── ...
    ├── critical.css        <- 4
    ├── main.css            <- Output (compiled result)
    ├── main.js
    └── ...
```
Another example explicitly differencing sources from compiled files (can be `src/` / `dist`, `build`, etc.) :
```
path/to/project/
    ├── node_modules/       <- (gitignored deps)
    │   ├── sanitize.css/
    │   └── ...
    ├── src/
    │   ├── base/               <- 1
    │   │   ├── my-component/   <- *
    │   │   │   └── ...
    │   │   └── ...
    │   ├── generic/            <- 2
    │   │   ├── my-component/   <- *
    │   │   │   └── ...
    │   │   └── ...
    │   ├── specific/           <- 3
    │   │   ├── my-component/   <- *
    │   │   │   └── ...
    │   │   └── ...
    ├── dist/
    │   ├── critical.css        <- 4
    │   ├── main.css            <- Output (compiled result)
    │   ├── main.js
    │   └── ...
    └── ...
```

### * Individual Components

Our present goal is to progressively publish a growing [library of open-source components](https://github.com/reusable-components), so that other projects can reuse these just like any other NPM package.

One of the main challenge is defining the "boundaries" between components, which can be very subjective - see the *Component Boundaries* and *Shell/Content Pattern* above.  
Here's some more advice from a javascript perspective : *"[don't overdo components](http://calmm-js.github.io/documentation/training/#/9/3) - Your components should do something substantial. Does it have a non-trivial model ? Is it a combination of elements you use in lots of places ?"*

Here's [@benfrain's (eCSS) example structure](http://ecss.io/chapter5.html) :
```
shopping-cart-template/
    ├── shopping-cart.html
    ├── shopping-cart.css
    └── shopping-cart.js
```

Here's another (work in progress) proposition, focusing on transpiling templates for maximum reusability (across various project stacks - e.g. Twig, Jade/Pug, etc.), planned [standard web-components](https://github.com/mateusortiz/webcomponents-the-right-way) support, and integration into existing [living styleguides](https://www.smashingmagazine.com/2015/04/an-in-depth-overview-of-living-style-guide-tools/) techniques :
```
my-component/
    ├── src/
    │   ├── my-component.css
    │   ├── my-component.js
    │   ├── my-component.*                  <- source for transpiling into different tpl formats
    │   └── ...
    ├── tpl/                                <- transpiled template formats (e.g. for CMSes)
    │   ├── jsx/
    │   │   └── my-component.jsx
    │   ├── phptemplate/
    │   │   └── my-component.tpl.php
    │   ├── twig/
    │   │   └── my-component.html.twig
    │   └── ...
    ├── my-component.html                   <- standard-compliant Web Component (à la Polymer)
    ├── index.html                          <- static, standard-compliant HTML (e.g. for living styleguides)
    ├── index.css
    ├── index.js
    ├── README.md                           <- usage, building, contributing instructions, etc.
    ├── package.json
    └── ...
```

The only implementation example that I currently know that could be used as a source for transpiling into different template formats is [@mikaelsandin's use of XML, XSD and XSL](https://medium.com/building-a-component-library/an-overview-of-the-component-framework-architecture-9ef83d7ebe65).

TODO : list a few Living Styleguides tools and quick setup / getting started instructions here.  
TODO : elaborate on approaches to extend components and/or to handle variation.  
TODO : javascript components ?

#### Terminology / Designation
- modules : sometimes used to refer to individual components.
- components : designate any reusable, modular, differenciable fragment or pattern of the interface.
- (design) pattern : traditional software engineering principle, sometimes used for meaning UI design pattern.
- UI design pattern : user interface components or interaction patterns.

#### Roadmap
- Make an alternative to [Axure](http://www.axure.com/) tailored to that kind of design system, for ex. based on [Electron](https://github.com/sindresorhus/awesome-electron) (see also [Photon](https://github.com/connors/photon))
- Look into [Yeoman](http://yeoman.io/) for boilerplate automation
- Elaborate on Element Queries, essentially adjusting elements to their container instead of the entire viewport, which makes more sense in a modular, component-oriented system. See [css-element-queries](https://github.com/marcj/css-element-queries) and [elementqueries](http://elementqueries.com/).

### 1. `base/` : Bare HTML tags & global declarations
This corresponds to the original [SMACSS category](http://snook.ca/archives/html_and_css/avoid-overstyling-base-styles) of the same name.

File naming : use categories from [Josh Duck’s HTML Periodic Table](http://smm.zoomquiet.io/data/20110511083224/index.html) ([Screenshot](http://bradfrost.com/wp-content/uploads/2012/11/Screen-Shot-2012-11-13-at-5.15.05-PM.png)) + [optional] use double extension `.vas.css` for files containing "low-level" variables.

Additional considerations :
- https://milligram.github.io/
- @jonathantneal's [Sanitize.css](https://github.com/10up/sanitize.css) or @necolas's [Normalize](https://github.com/necolas/normalize.css/)
- @mrmrs_'s [tachyons-box-sizing](https://github.com/tachyons-css/tachyons-box-sizing)
- Bits and pieces to adapt from @paulrobertlloyd's [Barebones](https://github.com/paulrobertlloyd/barebones)

Note : some base styles are likely specific to the current project (typographic settings, default tags appearance, etc) → TODO : discuss alternative structures.

#### Terminology / Designation
@bradfrost's terminology : **Atoms** / proposed alternative (common designation) : **Elements**

### 2. `generic/` : Immutable Utilities, Objects, Components
Styles with potential for reuse. Ideally, these should be included as third-party / vendor components (e.g. `node_modules`), but sometimes we need a place to start something reusable outside of the other folders. See the **"individual components"** section regarding reusability.

Important consideration : look at what [CSS Modules](https://github.com/css-modules) are doing for this.

Examples of styles belonging in this category :
- SUIT CSS [components-flex-embed](https://github.com/suitcss/components-flex-embed), [components-arrange](https://github.com/suitcss/components-arrange), etc.
- @mrmrs_'s [colors](https://github.com/mrmrs/colors)
- Any individual or isolated unit of styles that can be reused from other frameworks ([Tapestry](http://tapestry.wisembly.com/components), [InuitCSS](https://github.com/inuitcss), [Material Design Lite Components](https://github.com/google/material-design-lite), [PureCSS](http://purecss.io/), [BassCSS](http://www.basscss.com/), or even some [Zurb Foundation](https://github.com/zurb/foundation-sites) and [Bootstrap](https://github.com/twbs/bootstrap/) components)

#### Terminology / Designation
@bradfrost's terminology : usually **Molecules**, maybe even **Organisms** / proposed alternatives (common designation) : **Components**, **Objects**, **Utilities**

### 3. `specific/` : Current Project Styles
Low potential for reuse, but these styles shouldn't necessarily be unstructured either.
Within that folder, the organization should accomodate the size of the current project, and/or personal preference - ex : transposing @HugoGiraudel's [Architecture for a Sass Project](http://www.sitepoint.com/architecture-sass-project/)
Examples :
- Variables overrides (media queries values, objects and utilities customizations, etc.)
- Variations, extensions of objects ("specialization" of generic styles)
- *Theme* modifiers (as in @csswizardry's namespace terminology)
- Custom components

#### Terminology / Designation
@bradfrost's terminology : should mostly relate to **Organisms**, **Templates** and **Pages**, but could also include lower-level styles like **Molecules**  / proposed alternatives (common designation) : same as • 2. `generic/` + **Scopes**, **Compositions**.


### 4. `critical.css`
Experimental / to discuss :
This file is the result of a separate compilation, taking any CSS file ending with `.critical.css` (double extension), and optionally (TODO : compilation options) folders like `base/` or `generic/` (as the main layout and typography are usually abstracted - like grids, widths, box-model measures or scales).
Alternative tool to generate this file : @filamentgroup's [criticalCSS](https://github.com/filamentgroup/criticalCSS)
More info :
- @adactio's [Inlining critical CSS for first-time visits](https://adactio.com/journal/8504)
- @filamentgroup's [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html)
- @chriscoyier's [Authoring Critical Above-the-Fold CSS](https://css-tricks.com/authoring-critical-fold-css/)


## CSS Coding Style and Naming Conventions
- All imported CSS files should have the `_` prefix in their filename.
- File naming convention may also follow [InuitCSS's file naming conventions](https://github.com/inuitcss/getting-started) or [ITCSS](http://itcss.io/) ([Inverted Triangle](http://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731/2) metaphore - see [example](https://github.com/itcss/itcss-netmag/tree/master/css)).
- Selectors may use ANY of the following conventions : @csswizardry's [Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) (see [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) and @DaveOrDead's [Additional Tips](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)), [SUIT CSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md), [Enduring CSS (eCSS)](http://ecss.io/), [Tapestry](https://github.com/Wisembly/tapestry)... as long as it helps enforcing the principles outlined in the methodology.
- Additional BEMIT namespaces (custom class prefixes) suggestions :
    - `fx-` : effects or interactions
    - `b-` : box-model utilities : borders
    - `m-` : box-model utilities : margins
    - `p-` : box-model utilities : paddings
    - `c-` : custom component (not reusable) - to discuss : use CamelCase for reusable components only ?
- (to discuss) Double extension `.critical.css` for separate inline "critical" CSS compilation ?
- Encourage [Meaningful Whitespace](http://cssguidelin.es/#meaningful-whitespace)
- Components :
    - Consider additional namespace by vendor/author for portability (e.g. `fx-paulmicha-foobar`)
    - And/or implement dynamic prefixes with tools like [postcss-class-prefix](https://github.com/thompsongl/postcss-class-prefix) or [CSS Modules](https://github.com/css-modules/css-modules)
- T-shirt sizes : common suffixes to indicate size or magnitude. Example : see file [`_typography.vars.css`](base/_typography.vars.css).
- Color variable aliases : allows for safer ulterior modifications, by separating declaration (changing value) from application (changing usage). Example : see file [`_colors.vars.css`](base/_colors.vars.css) and file [`_root.css`](base/_root.css).
On colors, see also [clrs.cc](http://clrs.cc/) and [accessible color combinations (contrasts) examples](http://clrs.cc/a11y/).


## Linting

The choice not to enforce any particular selectors naming convention does not necessarily mean linting can't be done : it could test for obvious violations of the principles of the methodology (TODO : list a few implementations that could be combined without conflict).

It's worth noting that CSS Modules seem to have a similar stance : [*"For local class names camelCase naming is recommended, but not enforced."*](https://github.com/css-modules/css-modules)


## Regression Testing

See [@justin_tulloss's Building Accurate Visual Diffs](https://blog.spotbot.qa/building-accurate-visual-diffs-6b41b09973a6).

Here are a few tools that got my attention over the last few years :
- [BackstopJS](https://css-tricks.com/automating-css-regression-testing/)
- [Shoov.io](http://www.gizra.com/content/shoov-ui-regression/)
- [Spectre](https://medium.com/friday-people/how-we-do-visual-regression-testing-af63fa8b8eb1)

TODO : summarize quick setup instructions here.
