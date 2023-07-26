class VersiListViewer{
    constructor(container,versiData,tugasData){
        this.versiData = versiData;
        this.container = container;
        this.tugasData = tugasData
        this.masterCtx;
        this.render();
    }

    attach(data){
        this.versiData = data;
    }

    render(){
        this.container.html(Versi.renderElement(this.versiData));
    }

    reload(){
        this.versiData = Versi.getByTugasId(this.tugasData.id)
        this.render();
    }

    

    
}