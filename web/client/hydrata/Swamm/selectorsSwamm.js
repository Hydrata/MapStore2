export const orgSelector = (state) => state?.swamm?.bmpTypes ?
    state?.swamm?.bmpTypes.map(item => item?.organisation).filter(
        (v, i, a)=>a.findIndex(
            t=>(t.id === v.id)
        ) === i
    ) :
    null;

export const bmpByUniqueNameSelector = (state) => state?.swamm?.bmpTypes ?
    state?.swamm?.bmpTypes.filter(
        (v, i, a)=>a.findIndex(t=>(t.name === v.name)
        ) === i
    ) :
    [];

export const bmpDashboardDataSelector = (state) => {
    let bmps = state?.swamm?.allBmps ?
        state?.swamm?.allBmps :
        [];
    let outputObj = {};
    bmps.map((bmp) => {
        outputObj[bmp.id] = {
            ...bmp
        };
    });
    // const output = [{
    //     '2': {id: '2', watershed: '1000', status: 'Proposed', type: 'Wetland', org: 'IEPA', n_red: 440, p_red: 2400, s_red: 0},
    //     '23': {id: '23', watershed: '2000', status: 'Proposed', type: 'Wascb', org: 'IEPA', n_red: 1234, p_red: 2400, s_red: 7831},
    //     '3': {id: '3', watershed: '2000', status: 'Operational', type: 'Filter Strips', org: 'IEPA', n_red: 4000, p_red: 2400, s_red: 4000},
    //     '4': {id: '4', watershed: '2000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 7831, p_red: 0, s_red: 2400},
    //     '5': {id: '5', watershed: '1000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 4536, p_red: 2400, s_red: 0},
    //     '6': {id: '6', watershed: '1000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 4221, p_red: 7831, s_red: 222},
    //     '7': {id: '7', watershed: '3000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 0, p_red: 2400, s_red: 122},
    //     '8': {id: '8', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 6879, p_red: 4000, s_red: 2221},
    //     '9': {id: '9', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 4533, p_red: 3667, s_red: 7866}
    // }];
    return [outputObj];
};

export const bmpSpeedDialSelector = (state) => {
    const dashboardData = bmpDashboardDataSelector(state);
    const totalBmpNitrogenReduction = Object.keys(dashboardData[0]).reduce((accumulator, currentValue) => {
        return dashboardData[0][currentValue].n_load_reduction ?
            accumulator + parseFloat(dashboardData[0][currentValue].n_load_reduction) :
            accumulator;
    }, 0
    );
    const totalBmpPhosphorusReduction = Object.keys(dashboardData[0]).reduce((accumulator, currentValue) => {
        return dashboardData[0][currentValue].p_load_reduction ?
            accumulator + parseFloat(dashboardData[0][currentValue].p_load_reduction) :
            accumulator;
    }, 0
    );
    const totalBmpSedimentReduction = Object.keys(dashboardData[0]).reduce((accumulator, currentValue) => {
        return dashboardData[0][currentValue].s_load_reduction ?
            accumulator + parseFloat(dashboardData[0][currentValue].s_load_reduction) :
            accumulator;
    }, 0
    );
    const mapId = state?.projectManager?.data?.base_map;
    const targets = {
        699: {
            mapId: 699,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        },
        465: {
            mapId: 465,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        },
        9: {
            mapId: 9,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        },
        30: {
            mapId: 30,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        }
    };
    let totalResult =  {};
    totalResult[mapId] =  {
        ...targets[mapId],
        totalBmpNitrogenReduction: totalBmpNitrogenReduction,
        totalBmpPhosphorusReduction: totalBmpPhosphorusReduction,
        totalBmpSedimentReduction: totalBmpSedimentReduction,
        get targetNitrogenLoad() {
            return this.currentNitrogenLoad * (this.percentNitrogenReductionTarget / 100);
        },
        get targetPhosphorusLoad() {
            return this.currentPhosphorusLoad * (this.percentPhosphorusReductionTarget / 100);
        },
        get targetSedimentLoad() {
            return this.currentSedimentLoad * (this.percentSedimentReductionTarget / 100);
        },
        get targetNitrogenLoadReduction() {
            return this.currentNitrogenLoad - this.targetNitrogenLoad;
        },
        get targetPhosphorusLoadReduction() {
            return this.currentPhosphorusLoad - this.targetPhosphorusLoad;
        },
        get targetSedimentLoadReduction() {
            return this.currentSedimentLoad - this.targetSedimentLoad;
        },
        get percentNitrogenTarget() {
            return [
                {
                    name: "percentNitrogenTargetAcheived",
                    value: (totalBmpNitrogenReduction / this.targetNitrogenLoadReduction ) * 100
                },
                {
                    name: "percentNitrogenTargetRemaining",
                    value: 100 - (totalBmpNitrogenReduction / this.targetNitrogenLoadReduction ) * 100
                }
            ];
        },
        get percentPhosphorusTarget() {
            return [
                {
                    name: "percentPhosphorusTargetAcheived",
                    value: (totalBmpPhosphorusReduction / this.targetPhosphorusLoadReduction ) * 100
                },
                {
                    name: "percentNitrogenTargetRemaining",
                    value: 100 - (totalBmpPhosphorusReduction / this.targetPhosphorusLoadReduction ) * 100
                }
            ];
        },
        get percentSedimentTarget() {
            return [
                {
                    name: "percentSedimentTargetAcheived",
                    value: (totalBmpSedimentReduction / this.targetSedimentLoadReduction ) * 100
                },
                {
                    name: "percentSedimentTargetRemaining",
                    value: 100 - (totalBmpSedimentReduction / this.targetSedimentLoadReduction ) * 100
                }
            ];
        }
    };
    console.log('returning: ', totalResult[state?.projectManager?.data?.base_map]);
    return totalResult[state?.projectManager?.data?.base_map];
};
