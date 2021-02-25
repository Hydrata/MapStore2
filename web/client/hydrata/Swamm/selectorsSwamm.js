export const orgSelector =  (state) => state?.projectManager?.data?.organisations;

export const bmpByUniqueNameSelector = (state) => state?.swamm?.bmpTypes ?
    state?.swamm?.bmpTypes.filter(
        (v, i, a)=>a.findIndex(t=>(t.name === v.name)
        ) === i
    ) :
    [];

export const bmpDashboardDataSelector = (state) => {
    let bmps = state?.swamm?.allBmps ? state?.swamm?.allBmps : [];
    let outputObj = {};
    bmps.map((bmp) => {
        outputObj[bmp.id] = {
            ...bmp
        };
    });
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
        },
        327: {
            mapId: 327,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        },
        331: {
            mapId: 331,
            currentNitrogenLoad: 151591,
            currentPhosphorusLoad: 20352,
            currentSedimentLoad: 13801,
            percentNitrogenReductionTarget: 45,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 66
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
        699: {
            mapId: 699,
            currentNitrogenLoad: 1960104,
            currentPhosphorusLoad: 40696,
            currentSedimentLoad: 35334,
            percentNitrogenReductionTarget: 40,
            percentPhosphorusReductionTarget: 66,
            percentSedimentReductionTarget: 25
        },
        704: {
            mapId: 704,
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
