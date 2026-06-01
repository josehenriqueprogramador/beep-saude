import streamlit as st
import pandas as pd
import requests
import plotly.express as px
import plotly.graph_objects as go

st.set_page_config(page_title="Beep Saúde", layout="wide")

st.title("Beep Saúde | Central de Inteligência Operacional")

# Buscar dados da API
@st.cache_data
def get_data():
    res = requests.get('https://beep-app.onrender.com/api/dados')
    return pd.DataFrame(res.json())

df = get_data()

col1, col2 = st.columns(2)

with col1:
    st.subheader("Perfil de Pacientes por Hora")
    fig1 = px.area(df, x="hora", y=["Pacientes_Crianca", "Pacientes_Adulto"], 
                   color_discrete_sequence=["#8884d8", "#82ca9d"])
    st.plotly_chart(fig1, use_container_width=True)

with col2:
    st.subheader("Volume Operacional: Vacinas vs Coletas")
    fig2 = go.Figure()
    fig2.add_trace(go.Bar(x=df["hora"], y=df["Total_Vacinas"], name="Vacinas", marker_color="#f59e0b"))
    fig2.add_trace(go.Scatter(x=df["hora"], y=df["Total_Coletas"], name="Coletas", line=dict(color="#ef4444", width=3)))
    st.plotly_chart(fig2, use_container_width=True)

st.subheader("Tempo Médio por Casa (min) vs Duplas Necessárias")
fig3 = go.Figure()
fig3.add_trace(go.Bar(x=df["hora"], y=df["Tempo_Medio_por_Casa_Min"], name="Tempo (min)"))
fig3.add_trace(go.Scatter(x=df["hora"], y=df["Duplas_Necessarias"], name="Duplas", yaxis="y2"))
fig3.update_layout(yaxis2=dict(overlaying="y", side="right"))
st.plotly_chart(fig3, use_container_width=True)
