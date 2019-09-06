import { LightningElement, track } from 'lwc';

import createRow from '../../factory';
import Performance from '../../performance';

export default class App extends LightningElement {

	// Binding component's and store data.
	@track rows = [];
	current;

	/**
	 * Revive styles as soon, as possible.
	 */
	constructor() {
		super();

		/**
		 * Due to LWC restrictions and idea of shadow-root, there is no way to "pass" global styles to component via @import tag inside a modules's css file (https://github.com/salesforce/lwc/issues/1346#issuecomment-500033541).
		 * One of the workaround I've found is to create a <link> tag with desired external styles.
		 */
		const link = document.createElement('link');
		link.setAttribute('href', '/css/currentStyle.css');
		link.setAttribute('rel', 'stylesheet');
		this.template.appendChild(link);
	}

	// Internal helpers.
	_add(ammount) {
		for (let i = 0; i < ammount; i++) {
			this.rows.push(createRow());
		}
	}
	
	/**
	 * Task 1: create 1'000 rows.
	 */
	run() {
		Performance.start('run');
		this.rows = [];
		this._add(1000);
		Performance.stop();
	}

	/**
	 * Task 2: create 10'000 rows.
	 */
	runLots() {
		Performance.start('runLots');
		this.rows = [];
		this._add(10000);
		Performance.stop();
	}

	/**
	 * Task 3: Appending 1000 rows.
	 */
	add() {
		Performance.start('add');
		this._add(1000);
		Performance.stop();
	}
	
	/**
	 * Task 4: Update every 10th row.
	 */
	update() {
		Performance.start('update');
		for (let i = 0, n = this.rows.length; i < n; i+=10) {
			this.rows[i].label += ' !!!';
		}
		Performance.stop();
	}

	/**
	 * Task 5: Clear rows.
	 */
	clear() {
		Performance.start('clear');
		this.rows = [];
		Performance.stop();
	}

	/**
	 * Task 6: Swap rows.
	 */
	swapRows() {
		Performance.start('swapRows');
		if (this.rows.length > 998) {
			let temp = this.rows[1];
			this.rows[1] = this.rows[998];
			this.rows[998] = temp;
		}
		Performance.stop();
	}

	/**
	 * Task 7,8 helper.
	 */
	resolve(event) {
		const { action, id } = event.target.dataset;
		if (action && id) {
			this[action](Number(id), event.target);
		}
	}

	/**
	 * Task 7: Remove given row.
	 */
	remove(id) {
		Performance.start('remove');
		const index = this.rows.findIndex(r => r.id === id);
		this.rows = this.rows.slice(0, index).concat(this.rows.slice(index + 1));
		Performance.stop();
	}

	/**
	 * Task 8: Select given row.
	 */
	select(id) {
		Performance.start('select');
		if (!this.current || this.current.id !== id) {
			let row = this.rows[this.rows.findIndex(r => r.id === id)];
			if (this.current) {
				this.current.selected = false;
			}
			this.current = row;
		}
		this.current.selected = true;
		Performance.stop();
	}
}
