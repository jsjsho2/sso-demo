package com.raon.demo.db;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.raon.demo.data.FixVariable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DBConnect {

    public JsonArray getData(String sql) {
        String[] dbInfo = getDBInfo();
        JsonArray jsonArray = new JsonArray();

        try {
            Class.forName(dbInfo[0]);
        } catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
        }

        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            con = DriverManager.getConnection(dbInfo[1], dbInfo[2], dbInfo[3]);
            pstmt = con.prepareStatement(sql);
            rs = pstmt.executeQuery();

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCnt = rsmd.getColumnCount();

            while (rs.next()) {
                JsonObject jsonObject = new JsonObject();

                for (int i = 0; i < columnCnt; i++) {
                    String columnName = rsmd.getColumnName(i + 1);
                    String data = rs.getString(columnName);

                    jsonObject.addProperty(columnName, data == null ? null : data);
                }

                jsonArray.add(jsonObject);
            }

        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            try {
                rs.close();
                pstmt.close();
                con.close();
            } catch (SQLException e) {
                System.out.println(e);
            }
        }

        return jsonArray;
    }

    public JsonObject getDataOne(String sql) {
        String[] dbInfo = getDBInfo();
        JsonObject jsonObject = new JsonObject();

        try {
            Class.forName(dbInfo[0]);
        } catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
        }

        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            con = DriverManager.getConnection(dbInfo[1], dbInfo[2], dbInfo[3]);
            pstmt = con.prepareStatement(sql);
            rs = pstmt.executeQuery();

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCnt = rsmd.getColumnCount();

            while (rs.next()) {
                for (int i = 0; i < columnCnt; i++) {
                    String columnName = rsmd.getColumnName(i + 1);
                    String data = rs.getString(columnName);

                    jsonObject.addProperty(columnName, data == null ? null : data);
                }
            }

        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            try {
                rs.close();
                pstmt.close();
                con.close();
            } catch (SQLException e) {
                System.out.println(e);
            }
        }

        return jsonObject;
    }

    public String[] getDBInfo() {
        String[] dbInfo = new String[4];
        dbInfo[0] = FixVariable.getDriver();
        dbInfo[1] = FixVariable.getUrl();
        dbInfo[2] = FixVariable.getId();
        dbInfo[3] = FixVariable.getPw();

        return dbInfo;
    }
}
