class VisitsController < ApplicationController
    def index
        visits = Visit.all 
        render json: visits
    end

    def show
        visit = Visit.find(params[:id])
        render json: visit
    end

    def create
        visit = Visit.create(visit_params)
        render json: visit
    end

    def update
        visit.update(visit_params)
        render json :visit
        
    end

    def destroy
        visit = visit.find(params[:id])
        visit.destroy
        render json :visit
    end

    private
    def visit_params
        params.permit(:title, :date_of_visit, :doctor, :description, :patient_id)
    end

end
