sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/test/gherkin/dataTableUtils"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
	dataTableUtils) {
		"use strict";

		var constants = {
			SAFRA1: '2020/2021',
			SAFRA2: '2021/2022'
		};

		return Controller.extend("eggo.datepickertest.controller.View1", {
			onInit: function () {
				this._data = {
					Safra : [ { Period : constants.SAFRA1 },
						      { Period : constants.SAFRA2 }
						 	]	
				};
				
				this.jModel = new sap.ui.model.json.JSONModel();
				this.jModel.setData(this._data);
				
				// this.setMinDate(this);
				// this.setMaxDate(this);
			},

			onBeforeRendering: function() {
				this.byId('ins').setModel(this.jModel);	
			},
			setMinDate: function (oParam) {
				var lvCurrentDate = new Date();
				oParam.byId("DPI").setDateValue(lvCurrentDate);
				var lvMinDate = Date( oParam.byId("DPI").getValue());
				oParam.byId("DP").setMinDate(new Date(lvMinDate));
			 },
			 setMaxDate: function (oParam) {
				var lvCurrentDate = new Date();
				oParam.byId("DPF").setDateValue(lvCurrentDate);
			    var lvMaxDate = Date( oParam.byId("DPF").getValue());
				oParam.byId("DP").setMaxDate(new Date(lvMaxDate));		
			},
			handleChangeCb: function (oEvent) {
				var lvSafraSelected = oEvent.getSource().getValue();

				var lvDateSelected = this.getView().byId("DPC").getDateValue();

				switch (lvSafraSelected) {
					case constants.SAFRA1:
						this.getView().byId("DPC").setMinDate(new Date(2020, 0, 1));	
						this.getView().byId("DPC").setMaxDate(new Date(2021, 11, 31));	
						
						if (lvDateSelected != null) {
							var lvYear = String(lvDateSelected.getFullYear());
							
							if ( lvYear != constants.SAFRA1.substr(0,4) &&
							lvYear != constants.SAFRA1.substr(5,4) ) {
								this.getView().byId("DPC").setDateValue(null);
							}
						}
						break;
						
					case constants.SAFRA2:
						this.getView().byId("DPC").setMinDate(new Date(2021, 0, 1));	
						this.getView().byId("DPC").setMaxDate(new Date(2022, 11, 31));	

						if (lvDateSelected != null) {
							var lvYear = String(lvDateSelected.getFullYear());
							
							if ( lvYear != constants.SAFRA2.substr(0,4) &&
								 lvYear != constants.SAFRA2.substr(5,4) ) {
								this.getView().byId("DPC").setDateValue(null);
							}
						}
						break;
					default:
						break;
				}



			},
			handleChangeDPI: function (oEvent) {
				var sDatePicked = oEvent.getSource().getDateValue();
				this.getView().byId("DP").setMinDate( sDatePicked );
				var lvDateTmp = this.getView().byId("DP").getDateValue();

				if (lvDateTmp != null && lvDateTmp < sDatePicked) {					
					// this.getView().byId("DP").setDateValue( sDatePicked );
					this.getView().byId("DP").setDateValue( null );
				}
			},
			handleChangeDPF: function (oEvent) {
				var sDatePicked = oEvent.getSource().getDateValue();
				this.getView().byId("DP").setMaxDate( sDatePicked );
				var lvDateTmp = this.getView().byId("DP").getDateValue();

				if (lvDateTmp != null && lvDateTmp > sDatePicked) {					
					// this.getView().byId("DP").setDateValue( sDatePicked );
					this.getView().byId("DP").setDateValue( null );
				}
			}
		});
	});
